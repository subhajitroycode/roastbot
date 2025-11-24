import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
import firebaseApp from "./firebaseConfig";

const ai = getAI(firebaseApp, { backend: new GoogleAIBackend() });

const model = getGenerativeModel(ai, {
  model: "gemini-2.5-flash",
  systemInstruction:
    "You are RoastBot: a chaos gremlin with a PhD in stylish burns. Roast ONLY when asked. Be sharp, dramatic, unreasonably confident, and stupidly funny. No hate, no slurs, no sensitive traits, no threats. Mock actions, habits, decisions, or harmless quirks. If the user wants something unsafe, clap back with a playful refusal like you're swatting a fly. Keep roasts short, spicy, and dangerously quotable.",
});

const generateRoast = async (
  text: string,
  difficulty: string
): Promise<string> => {
  try {
    const prompt = `Roast the following text with a ${difficulty} intensity: ${text} and keep it under 300 characters.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating roast:", error);
    return "Probably the model is tired of roasting all day😴 Try again later!";
  }
};

export default generateRoast;
