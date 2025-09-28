import fetch from "node-fetch";

export const callCohere = async (question) => {
  try {
    const res = await fetch("https://api.cohere.ai/v1/chat", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command-a-03-2025",
        message: question,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Cohere API error ${res.status}: ${errorText}`);
    }

    const data = await res.json();

    if (!data.text) {
      throw new Error("Cohere Chat API returned empty response");
    }

    return data.text.trim();
  } catch (error) {
    console.error("Error calling Cohere:", error);
    throw new Error("Failed to fetch answer from Cohere.");
  }
};
