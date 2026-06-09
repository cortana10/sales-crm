import "server-only";

// AI Assistant Service
// Uses OpenAI API for follow-up generation, chat summary, and suggested actions
// Uses OpenAI API for follow-up generation, chat summary, and suggested actions

interface AIConfig {
  apiKey: string;
  model?: string;
}

const config: AIConfig = {
  apiKey: process.env.OPENAI_API_KEY || "",
  model: "gpt-4o-mini",
};

interface LeadContext {
  name: string;
  package_interest?: string;
  notes?: string;
  chatHistory?: { role: "assistant" | "user"; content: string }[];
}

export async function generateFollowUpMessage(lead: LeadContext): Promise<string> {
  if (!config.apiKey) return "AI Assistant: OpenAI API key not configured.";

  const systemPrompt = `You are an AI sales assistant for an Umrah travel agency. 
Generate a personalized WhatsApp follow-up message in Indonesian/Bahasa.
Keep it warm, professional, and respectful of Islamic values.
Do not use markdown. Keep it under 300 characters.`;

  const userPrompt = `Generate a follow-up message for:
- Name: ${lead.name}
- Package Interest: ${lead.package_interest || "Not specified"}
- Notes: ${lead.notes || "No notes"}
- Chat History: ${lead.chatHistory?.map((c) => `${c.role}: ${c.content}`).join("\n") || "No history"}`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Maaf, saya tidak bisa menghasilkan pesan saat ini.";
  } catch (error) {
    console.error("AI generation error:", error);
    return "Error generating message. Please try again.";
  }
}

export async function summarizeChat(chatHistory: { role: string; content: string }[]): Promise<string> {
  if (!config.apiKey) return "AI Assistant: OpenAI API key not configured.";

  const messages = [
    { role: "system" as const, content: "Summarize this sales conversation in 2-3 bullet points in Indonesian. Focus on: interest level, objections, next steps." },
    { role: "user" as const, content: chatHistory.map((c) => `${c.role}: ${c.content}`).join("\n") },
  ];

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({ model: config.model, messages, max_tokens: 150 }),
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Summary not available.";
  } catch (error) {
    console.error("AI summary error:", error);
    return "Error generating summary.";
  }
}

export async function suggestAction(lead: LeadContext): Promise<string> {
  if (!config.apiKey) return "AI Assistant: OpenAI API key not configured.";

  const messages = [
    {
      role: "system" as const,
      content: "Based on the lead info and conversation, suggest the next best action in 1-2 sentences in Indonesian.",
    },
    {
      role: "user" as const,
      content: `Lead: ${lead.name}, Package: ${lead.package_interest}, Notes: ${lead.notes}`,
    },
  ];

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({ model: config.model, messages, max_tokens: 100 }),
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Kirim pesan follow-up dan tanyakan kabar.";
  } catch (error) {
    console.error("AI suggest error:", error);
    return "Error generating suggestion.";
  }
}