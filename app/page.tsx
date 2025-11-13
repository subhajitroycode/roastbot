"use client";

import { useState } from "react";
import Header from "./components/Header";
import InputForm from "./components/InputForm";
import ResponseBox from "./components/ResponseBox";

export default function Home() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (text: string, difficulty: string) => {
    setLoading(true);
    setResponse("");
    try {
      const { default: generateRoast } = await import("./utils/RoastGenerator");
      const roast = await generateRoast(text, difficulty);
      setResponse(roast);
    } catch (error) {
      setResponse(
        "Probably the model is tired of roasting all day😴 Try again later!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        <InputForm onSubmit={handleSubmit} />
        <ResponseBox response={response} loading={loading} />
      </main>
    </>
  );
}
