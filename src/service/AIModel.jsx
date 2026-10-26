


import { GoogleGenerativeAI } from '@google/generative-ai';

// Get your API key from the .env.local file
const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Get the generative model
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });


// Start a chat session
const chatSession = model.startChat();

// Export a simple function that takes a prompt and sends it
export const chat = async (prompt) => {
  console.log("Sending prompt to AI:", prompt);
  const result = await chatSession.sendMessage(prompt);
  const response = await result.response;
  return response.text();
};