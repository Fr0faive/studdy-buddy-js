import { initializeChat, sendMessage } from "@/app/_helpers/gemini";
import { NextResponse } from "next/server";

const firstMessage = "Hi, I am Buddy. How can I help you?";
export async function POST(request) {
  const { message, conversation } = await request.json();

  if (!conversation) {
    const newConversation = initializeChat(firstMessage);
    return new Response(
      JSON.stringify({
        message: firstMessage,
        conversation: newConversation,
      }),
      { status: 200 }
    );
  }

  const response = await sendMessage(message, conversation);
  return new Response(JSON.stringify(response), { status: 200 });
}

export async function GET() {
  return new Response("Method Not Allowed", { status: 405 });
}
