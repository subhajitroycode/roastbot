// app/api/og/route.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";

// Fetch helper (works in Edge & dev)
async function fetchArrayBuffer(req: Request, publicPath: string) {
  try {
    const origin = new URL(req.url).origin;
    const url = `${origin}${publicPath}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}`);
    return res.arrayBuffer();
  } catch (err) {
    console.error("Asset fetch failed:", publicPath, err);
    return null;
  }
}

// Convert ArrayBuffer → data:image/png;base64 URL
async function arrayBufferToDataUrl(buffer: ArrayBuffer, mime = "image/png") {
  const b = Buffer.from(buffer);
  return `data:${mime};base64,${b.toString("base64")}`;
}

// Simple line wrapper for readable roasts
function wrap(text: string, max = 40) {
  const words = text.split(" ");
  let lines: string[] = [];
  let line = "";

  for (const w of words) {
    if ((line + " " + w).trim().length > max) {
      lines.push(line.trim());
      line = w;
    } else {
      line = (line + " " + w).trim();
    }
  }
  if (line) lines.push(line);
  return lines.join("\n");
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const rawText =
    searchParams.get("text") ||
    "You look like a software update — unnecessary and badly timed.";
  const text = rawText.slice(0, 400);
  const wrapped = wrap(text, 40);

  // Load assets from public/
  const fontBuf = await fetchArrayBuffer(req, "/fonts/Montserrat-Regular.ttf");
  const logoBuf = await fetchArrayBuffer(req, "/logo.png");

  if (!fontBuf) {
    return new Response(
      JSON.stringify({
        error:
          "Missing Montserrat font. Put it in public/fonts/Montserrat-Regular.ttf",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  let logoDataUrl: string | null = null;
  if (logoBuf) logoDataUrl = await arrayBufferToDataUrl(logoBuf);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(180deg,#0f1724,#06070a)",
          color: "#ffffff",
          padding: 80,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          fontFamily: "Montserrat",
        }}
      >
        {/* Logo */}
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 40 }}
        >
          {logoDataUrl ? (
            <img
              src={logoDataUrl}
              alt="RoastBot"
              width={320}
              height={110}
              style={{ objectFit: "contain" }}
            />
          ) : (
            <div style={{ fontSize: 48, fontWeight: 700 }}>RoastBot</div>
          )}
        </div>

        {/* Roast Text */}
        <div
          style={{
            fontSize: 56,
            whiteSpace: "pre-wrap",
            lineHeight: 1.14,
            flex: 1,
            display: "flex",
            alignItems: "center",
            textShadow: "0 6px 18px rgba(0,0,0,0.6)",
          }}
        >
          {wrapped}
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            right: 80,
            bottom: 60,
            fontSize: 20,
            opacity: 0.7,
          }}
        >
          roastbot.app
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1350,
      fonts: [
        {
          name: "Montserrat",
          data: fontBuf,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );
}
