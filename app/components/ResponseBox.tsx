import { useEffect, useState } from "react";

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
      <div className="w-lg min-h-48 p-4 text-white bg-linear-to-r from-[#003153] to-[#3d4756] border border-blue-500 rounded-lg shadow-[0_0_20px_#3b82f680] flex items-center justify-center">
        {loading ? (
          <p>Let him cook now...</p>
        ) : response ? (
          <p className="whitespace-pre-wrap">{displayedText}</p>
        ) : (
          <p>Your roast will be cooked here 😉</p>
        )}
      </div>
    </section>
  );
};

export default ResponseBox;
