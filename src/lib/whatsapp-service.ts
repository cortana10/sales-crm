// WhatsApp Integration Service
// Uses Evolution API (https://github.com/EvolutionAPI/evolution-api)

interface EvolutionConfig {
  url: string;
  apiKey: string;
  instanceName: string;
}

const config: EvolutionConfig = {
  url: process.env.EVOLUTION_API_URL || "",
  apiKey: process.env.EVOLUTION_API_KEY || "",
  instanceName: "umrah-crm",
};

export async function sendWhatsApp(phone: string, message: string): Promise<boolean> {
  if (!config.url || !config.apiKey) {
    console.warn("Evolution API not configured. Message not sent.");
    return false;
  }

  try {
    const response = await fetch(`${config.url}/message/sendText/${config.instanceName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": config.apiKey,
      },
      body: JSON.stringify({
        number: phone,
        text: message,
        delay: 1200,
      }),
    });

    if (!response.ok) {
      console.error("WhatsApp send error:", await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error("WhatsApp send error:", error);
    return false;
  }
}

export async function sendMediaMessage(
  phone: string,
  mediaUrl: string,
  caption?: string,
  mediaType: "image" | "document" = "image"
): Promise<boolean> {
  if (!config.url || !config.apiKey) {
    console.warn("Evolution API not configured.");
    return false;
  }

  try {
    const endpoint = mediaType === "image" ? "sendImage" : "sendDocument";
    const response = await fetch(`${config.url}/message/${endpoint}/${config.instanceName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": config.apiKey,
      },
      body: JSON.stringify({
        number: phone,
        media: mediaUrl,
        caption,
        delay: 1200,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error("WhatsApp media error:", error);
    return false;
  }
}

export async function sendBroadcast(phones: string[], message: string): Promise<{ sent: number; failed: number }> {
  let sent = 0;
  let failed = 0;

  for (const phone of phones) {
    const success = await sendWhatsApp(phone, message);
    if (success) sent++;
    else failed++;
    // Rate limiting delay
    await new Promise((r) => setTimeout(r, 1500));
  }

  return { sent, failed };
}
