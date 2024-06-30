import { GoogleGenerativeAI } from "@google/generative-ai";
let conversation = null;

const getAPIKey = () => {
  return process.env.GEMINI_API_KEY;
};
export function initializeChat(message) {
  const geminiApiKey = getAPIKey();
  const model = new GoogleGenerativeAI(geminiApiKey).getGenerativeModel({
    model: "gemini-pro",
  });

  const initHistory = [
    {
      role: "user",
      parts: [message],
    },
    {
      role: "model",
      parts: "Hi, I am Buddy. Apa yang bisa ku bantu.",
    },
  ];
  conversation = model.startChat({
    history: initHistory,
    generationConfig: {
      maxOutputTokens: 350,
    },
  });
  conversation._apiKey = null;
  return conversation;
}

export async function sendMessage(message) {
  const geminiApiKey = getAPIKey();
  const response = {
    text: "Something went wrong",
    conversation: null,
  };

  if (!conversation) {
    conversation = initializeChat(message); // Mulai percakapan baru jika null
  }

  try {
    conversation._apiKey = geminiApiKey;
    const result = await conversation.sendMessage(message);
    response.text = await result.response.text();
    response.conversation = conversation;
    return response;
  } catch (error) {
    console.error("Error sending message:", error.message);
    response.text = "An error occurred while processing your request.";
    response.conversation = conversation;
    return response;
  }
}
