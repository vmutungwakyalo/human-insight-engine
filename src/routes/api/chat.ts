import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, type UIMessage } from "ai";
import { streamChat } from "@/lib/ai.server";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { messages: UIMessage[]; mode?: string };
        if (!Array.isArray(body.messages)) return new Response("Bad request", { status: 400 });
        const mode = typeof body.mode === "string" ? body.mode : "tutor";
        return streamChat(request, mode, await convertToModelMessages(body.messages.slice(-30)));
      },
    },
  },
});
