"use client";

import { useState } from "react";
import RadioButton from "./ui/RadioButton";

const InputForm = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("soft");

  return (
    <section className="flex justify-center">
      <form>
        <textarea
          name="input-text"
          id="input-text"
          placeholder="Type your bio or tweet or message or any text here..."
          className="w-xl h-48 p-2 text-white bg-neutral-800 border border-gray-600 rounded-lg resize-none focus:outline-none focus:border-2 focus:border-red-500"
          style={{
            boxShadow: "none",
          }}
          onFocus={(e) => {
            e.target.style.boxShadow =
              "0 0 20px rgba(239, 68, 68, 0.6), 0 0 40px rgba(239, 68, 68, 0.3)";
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = "none";
          }}
        ></textarea>
        <div className="flex justify-between items-center  mt-2 mb-4">
          <div className="flex gap-2">
            <RadioButton
              value="soft"
              checked={selectedDifficulty === "soft"}
              onChange={setSelectedDifficulty}
            />
            <RadioButton
              value="medium"
              checked={selectedDifficulty === "medium"}
              onChange={setSelectedDifficulty}
            />
            <RadioButton
              value="hard"
              checked={selectedDifficulty === "hard"}
              onChange={setSelectedDifficulty}
            />
          </div>
          <button type="submit" className="text-white">
            🔥 Roast Me
          </button>
        </div>
      </form>
    </section>
  );
};

export default InputForm;
