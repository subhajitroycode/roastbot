import { ImageResponse } from "next/og";

export const runtime = "edge";

const loadFontFromOrigin = async (
  req: Request,
  publicPath: string
): Promise<ArrayBuffer | null> => {
  try {
    const origin = new URL(req.url).origin;
    const fontUrl = `${origin}${publicPath}`;
    const resp = await fetch(fontUrl);
    if (!resp.ok) {
      throw new Error(
        `Font fetch failed: ${resp.status} ${resp.statusText} (${fontUrl})`
      );
    }
    return await resp.arrayBuffer();
  } catch (err) {
    console.error("Font load failed for", publicPath, err);
    return null;
  }
};

const wrapTextSimple = (text: string, maxCharsPerLine = 40): string => {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > maxCharsPerLine) {
      lines.push(line.trim());
      line = w;
    } else {
      line = (line + " " + w).trim();
    }
  }
  if (line) lines.push(line);
  return lines.join("\n");
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rawText = String(searchParams.get("text") || "Roastbot");
  const text = rawText.slice(0, 400);

  const fontPublicPath = "/fonts/Montserrat-Regular.ttf";

  const fontData = await loadFontFromOrigin(req, fontPublicPath);

  if (!fontData) {
    console.error(
      `Failed to load font at ${fontPublicPath}. Make sure the file exists at public${fontPublicPath} and your dev server is running.`
    );
    return new Response(
      JSON.stringify({
        error: `Failed to load font at ${fontPublicPath}. Ensure the font file exists under public${fontPublicPath} and restart dev server.`,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const wrapped = wrapTextSimple(text, 40);

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: 80,
            background: "linear-gradient(180deg,#0f1724,#0a0f15)",
            color: "#fff",
            fontFamily: "Montserrat",
          }}
        >
          <div style={{ fontSize: 36, opacity: 0.85 }}>RoastBot 🔥</div>

          <div
            style={{
              marginTop: 40,
              fontSize: 56,
              lineHeight: 1.12,
              whiteSpace: "pre-wrap",
              flex: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            {wrapped}
          </div>

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
            data: fontData,
            style: "normal",
            weight: 400,
          },
        ],
      }
    );
  } catch (err) {
    console.error("OG generation error:", err);
    throw err;
  }
}
