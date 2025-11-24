import { useEffect, useState } from "react";
import downloadRoastCard from "../utils/downloadRoast";
import { FiCopy, FiDownload } from "react-icons/fi";
import Button from "./ui/Button";

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
      <div className="w-80 md:w-lg h-48 p-4 text-white bg-linear-to-r from-[#003153] to-[#3d4756] border border-blue-500 rounded-lg shadow-[0_0_20px_#3b82f680] relative">
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

        <div
          className={`flex md:flex-col gap-2 absolute top-52 right-1/2 translate-x-1/2 md:top-1/2 md:-right-1/6 transform md:-translate-y-1/2 transition-all duration-500 ease-out ${
            !loading && response
              ? "opacity-100 translate-y-0 md:translate-x-0"
              : "opacity-0 -translate-y-4 md:-translate-x-8 pointer-events-none"
          }`}
        >
          <Button onClick={() => downloadRoastCard(response)}>
            <FiDownload className="text-2xl" />
          </Button>
          <Button onClick={() => navigator.clipboard.writeText(response)}>
            <FiCopy className="text-2xl" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ResponseBox;
