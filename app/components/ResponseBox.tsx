import { useEffect, useState } from "react";
import downloadRoastCard from "../utils/downloadRoast";

interface ResponseBoxProps {
  response: string;
  loading: boolean;
}

const ResponseBox: React.FC<ResponseBoxProps> = ({ response, loading }) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (response) {
      setDisplayedText("");
      setCurrentIndex(0);
    }
  }, [response]);

  useEffect(() => {
    if (!response || currentIndex >= response.length) return;

    const timeout = setTimeout(() => {
      setDisplayedText(response.slice(0, currentIndex + 1));
      setCurrentIndex(currentIndex + 1);
    }, 30);

    return () => clearTimeout(timeout);
  }, [currentIndex, response]);

  return (
    <section className="flex justify-center mt-6">
      <div className="w-lg h-48 p-4 text-white bg-linear-to-r from-[#003153] to-[#3d4756] border border-blue-500 rounded-lg shadow-[0_0_20px_#3b82f680]">
        {loading ? (
          <div className="h-full w-full flex justify-center items-center">
            <p>Let him cook now...</p>
          </div>
        ) : response ? (
          <div className="h-full w-full overflow-y-auto">
            <p className="whitespace-pre-wrap">{displayedText}</p>
          </div>
        ) : (
          <div className="h-full w-full flex justify-center items-center">
            <p>Your roast will be cooked here 😉</p>
          </div>
        )}
      </div>
      {!loading && response && (
        <div className="mt-4 flex gap-2">
          <button
            className="px-4 py-2 bg-red-500 rounded text-white"
            onClick={() => downloadRoastCard(response)}
          >
            ⬇️ Download Card
          </button>
          <button
            className="px-4 py-2 bg-neutral-800 rounded text-white"
            onClick={() => navigator.clipboard.writeText(response)}
          >
            📋 Copy
          </button>
        </div>
      )}
    </section>
  );
};

export default ResponseBox;
