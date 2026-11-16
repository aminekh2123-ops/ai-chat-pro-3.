
export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "Gemini API key is missing." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const messages = body.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        { error: "No messages were provided." },
        { status: 400 }
      );
    }

    const contents = messages.map((message: any) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: String(message.content ?? message.text ?? "") }]
    }));

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body: JSON.stringify({ contents })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { error: data.error?.message || "Gemini request failed." },
        { status: response.status }
      );
    }

    const reply =
      data.candidates?.[0]?.content?.parts
        ?.map((part: any) => part.text || "")
        .join("") || "I couldn't generate a response.";

    return Response.json({ reply });

  } catch (error) {
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
