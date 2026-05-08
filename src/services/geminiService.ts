import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export async function getAIContextResponse(prompt: string, context: "real-life" | "twisted" | "general") {
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return "API Key is not configured. Please go to the Secrets panel in AI Studio and add your GEMINI_API_KEY.";
  }

  let systemInstruction = "";
  if (context === "real-life") {
    systemInstruction = "You are an expert meteorologist. Provide extremely concise, brief, and educational information about real-life tornadoes. Limit responses to 2-3 short sentences. Use bullet points for lists.";
  } else if (context === "twisted") {
    systemInstruction = "You are an expert on the Roblox game 'Twisted'. Discuss game mechanics and strategies extremely briefly. Limit responses to 2-3 short sentences. Focus only on the most important details.";
  } else {
    systemInstruction = "You are a concise AI assistant for tornadoes and 'Twisted' Roblox. Answer questions very briefly and directly. Limit responses to 2-3 short sentences.";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("AI Service Error:", error);
    if (error instanceof Error && error.message.includes("API key not valid")) {
      return "The provided Gemini API key is invalid. Please check your key in the Secrets panel.";
    }
    return "Error communicating with AI. Please check your connection.";
  }
}
