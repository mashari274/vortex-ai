import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getAIContextResponse(prompt: string, context: "real-life" | "twisted" | "general") {
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
    console.error("Gemini AI Error:", error);
    return "Error communicating with AI. Please check your configuration.";
  }
}
