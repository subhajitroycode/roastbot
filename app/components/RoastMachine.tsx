"use client";

import { useState } from "react";
import generateRoast from "@/app/utils/roastGenerator";
import InputForm from "./InputForm";
import ResponseBox from "./ResponseBox";

export default function RoastMachine() {
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (text: string, difficulty: string) => {
    setLoading(true);
    setResponse("");

    try {
      const roast = await generateRoast(text, difficulty);
      setResponse(roast);
    } catch (error) {
      setResponse("Something went wrong. The roast was too hot to handle! 🔥");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <InputForm onSubmit={handleSubmit} loading={loading} />
      <ResponseBox response={response} loading={loading} />
    </>
  );
}
