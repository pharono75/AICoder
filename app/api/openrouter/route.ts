// app/api/openrouter/route.ts
import { NextResponse } from "next/server";

const OPENROUTER_API_KEY = "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";
const MODEL = "google/gemma-4-26b-a4b-it:free";

type RequestBody = {
  prompt?: string;
};

export async function POST(request: Request) {
  let body: RequestBody;

  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return NextResponse.json({ error: "Некорректный JSON в запросе." }, { status: 400 });
  }

  const prompt = body.prompt?.trim();

  if (!prompt) {
    return NextResponse.json({ error: "Введите prompt для тестового запроса." }, { status: 400 });
  }

  if (prompt.length > 8000) {
    return NextResponse.json({ error: "Prompt слишком длинный. Ограничение: 8000 символов." }, { status: 400 });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "X-Title": "AI Coder API",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content: `Ты — AI Coder, профессиональный ассистент для разработчиков.

ПРАВИЛА ОТВЕТОВ:
1. Отвечай только на русском языке
2. Используй Markdown для форматирования
3. Давай конкретные, практичные ответы с примерами кода
4. Будь структурированным: используй заголовки, списки, блоки кода
5. Не используй плейсхолдеры типа <pad>, [insert], [placeholder]
6. Не давай финансовых обещаний
7. Не используй рекламные формулировки

ФОРМАТ ОТВЕТА:
- Заголовки для разделов
- Код-блоки с указанием языка
- Маркированные списки для перечислений
- Нумерованные списки для последовательных действий
- Выделение важных терминов жирным

ОТВЕЧАЙ ТОЛЬКО ПО ТЕМЕ ЗАПРОСА.`
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 2000,
        stream: true,
        stop: ["<pad>", "Whiting", "[insert]", "[placeholder]", "de de de", "Whiting Whiting"],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          error: errorData?.error?.message || errorData?.message || "OpenRouter вернул ошибку.",
          status: response.status,
        },
        { status: response.status }
      );
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let fullResponse = "";
    let reasoningTokens = 0;
    let totalTokens = 0;
    let promptTokens = 0;
    let completionTokens = 0;

    if (!reader) {
      throw new Error("Не удалось прочитать поток ответа");
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split("\n").filter(line => line.trim() !== "");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullResponse += content;
            }

            if (parsed.usage) {
              reasoningTokens = parsed.usage.reasoning_tokens || parsed.usage.reasoningTokens || 0;
              totalTokens = parsed.usage.total_tokens || 0;
              promptTokens = parsed.usage.prompt_tokens || 0;
              completionTokens = parsed.usage.completion_tokens || 0;
            }
          } catch (e) {
            // Игнорируем ошибки парсинга
          }
        }
      }
    }

    // Очищаем ответ от возможных артефактов
    let cleanAnswer = fullResponse
      .replace(/<pad>/g, '')
      .replace(/Whiting/g, '')
      .replace(/\[insert\]/g, '')
      .replace(/\[placeholder\]/g, '')
      .replace(/de de de/g, '')
      .trim();

    return NextResponse.json({
      answer: cleanAnswer || "Модель вернула пустой ответ.",
      model: MODEL,
      usage: {
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        total_tokens: totalTokens,
        reasoning_tokens: reasoningTokens,
      },
    });
  } catch (error) {
    console.error("OpenRouter error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Не удалось выполнить запрос к OpenRouter.",
      },
      { status: 502 }
    );
  }
}