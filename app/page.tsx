"use client";

import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
import firebaseApp from "./utils/firebaseConfig";
import Header from "./components/Header";
import InputForm from "./components/InputForm";

export default function Home() {
  const ai = getAI(firebaseApp, { backend: new GoogleAIBackend() });

  const model = getGenerativeModel(ai, {
    model: "gemini-2.5-flash",
    systemInstruction:
      "You are RoastBot, an AI that tells funny and light-hearted jokes about programmers.",
  });

  const run = async () => {
    const prompt = "Tell me a joke about programmers.";

    const result = await model.generateContent(prompt);

    const response = result.response;
    const text = response.text();
    console.log("AI Response:", text);
  };

  return (
    <>
      <Header />
      <main>
        <InputForm />
      </main>
    </>
  );
}
