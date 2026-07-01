// components/OpenRouterTester.tsx
"use client";

import { FormEvent, useState } from "react";
import { Loader2, Send, Terminal, Sparkles, Shield, Code, Database } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type TestResponse = {
  answer?: string;
  error?: string;
  model?: string;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
    reasoning_tokens?: number;
  } | null;
};

// Примеры промптов для быстрого тестирования
const EXAMPLE_PROMPTS = [
  {
    label: "🔒 Безопасность API",
    text: "Объясни, как безопасно подключить OpenRouter к VS Code extension через backend API. Почему нельзя хранить ключи в клиентском коде? Опиши архитектуру Client → Backend → LLM Provider с примерами кода."
  },
  {
    label: "💻 Архитектура",
    text: "Опиши архитектуру AI-ассистента для VS Code. Какие компоненты нужны? Как организовать взаимодействие между расширением, бэкендом и LLM? Включи диаграмму в формате mermaid."
  },
  {
    label: "🧪 Тестирование",
    text: "Напиши примеры тестов для AI-агента в VS Code extension. Какие сценарии нужно покрыть? Используй Vitest и дай практические примеры."
  },
  {
    label: "📚 Документация",
    text: "Создай структуру документации для AI Coder. Включи: установку, настройку, примеры использования, troubleshooting. Используй Markdown формат."
  }
];

export function OpenRouterTester() {
  const [prompt, setPrompt] = useState(EXAMPLE_PROMPTS[0].text);
  const [result, setResult] = useState<TestResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/openrouter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = (await response.json()) as TestResponse;
      setResult(data);
    } catch (error) {
      setResult({
        error: error instanceof Error ? error.message : "Не удалось отправить запрос.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <form onSubmit={submit} className="doc-panel space-y-5">
        <div>
          <div className="mb-4 p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
            <div className="flex items-center gap-2 text-sm text-cyan-300">
              <Sparkles className="w-4 h-4" />
              <span>Модель: <b>Google Gemma 4 26B (бесплатная)</b></span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <Shield className="w-3 h-3" />
              <span>Ключ API защищен, передается только через сервер</span>
            </div>
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Быстрые примеры
            </label>
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_PROMPTS.map((example) => (
                <button
                  key={example.label}
                  type="button"
                  onClick={() => setPrompt(example.text)}
                  className="text-xs px-3 py-1.5 rounded-full border border-white/10 hover:border-cyan-500/50 text-slate-400 hover:text-white transition-colors"
                >
                  {example.label}
                </button>
              ))}
            </div>
          </div>
          
          <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="prompt">
            Ваш запрос
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            rows={10}
            className="w-full resize-y rounded border border-white/10 bg-slate-950 px-3 py-3 text-sm leading-6 text-white outline-none focus:border-cyan-300 font-mono"
            placeholder="Введите запрос к AI Coder..."
          />
        </div>

        <button 
          className="btn btn-primary w-full px-5 py-3" 
          disabled={loading || !prompt.trim()}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {loading ? "Отправляю запрос..." : "Отправить"}
        </button>
      </form>

      <section className="panel overflow-hidden">
        <div className="flex items-center gap-2 border-b border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-300">
          <Terminal className="h-4 w-4 text-cyan-300" />
          Ответ AI Coder
        </div>
        <div className="min-h-[520px] bg-[#0b1020] p-5 overflow-auto">
          {!result && (
            <div className="rounded border border-white/10 bg-slate-950/60 p-4 text-sm leading-6 text-slate-400">
              Здесь появится ответ модели в Markdown формате. 
              Используй быстрые примеры выше или напиши свой запрос.
            </div>
          )}

          {result?.error && (
            <pre className="whitespace-pre-wrap rounded border border-red-400/25 bg-red-950/25 p-4 text-sm leading-6 text-red-100">
              ❌ {result.error}
            </pre>
          )}

          {result?.answer && (
            <div className="space-y-4">
              <div className="prose prose-invert prose-cyan max-w-none prose-pre:bg-slate-950/80 prose-pre:border prose-pre:border-white/10">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({node, inline, className, children, ...props}) {
                      const match = /language-(\w+)/.exec(className || '');
                      const language = match ? match[1] : 'code';
                      return !inline ? (
                        <div className="relative my-4">
                          <div className="absolute top-0 right-0 text-[10px] text-slate-400 bg-slate-800/90 px-2 py-1 rounded-bl border-l border-b border-white/10">
                            {language}
                          </div>
                          <pre className="bg-slate-950/90 rounded-lg p-4 overflow-auto border border-white/10">
                            <code className={className} {...props}>
                              {children}
                            </code>
                          </pre>
                        </div>
                      ) : (
                        <code className="bg-slate-800/80 px-1.5 py-0.5 rounded text-cyan-300 text-sm" {...props}>
                          {children}
                        </code>
                      );
                    },
                    h1: ({children}) => <h1 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">{children}</h1>,
                    h2: ({children}) => <h2 className="text-xl font-bold text-cyan-300 mb-3 mt-6">{children}</h2>,
                    h3: ({children}) => <h3 className="text-lg font-semibold text-white mb-2 mt-4">{children}</h3>,
                    h4: ({children}) => <h4 className="text-base font-medium text-slate-200 mb-2 mt-3">{children}</h4>,
                    ul: ({children}) => <ul className="list-disc list-inside space-y-1 text-slate-300 mb-4">{children}</ul>,
                    ol: ({children}) => <ol className="list-decimal list-inside space-y-1 text-slate-300 mb-4">{children}</ol>,
                    li: ({children}) => <li className="text-slate-300">{children}</li>,
                    p: ({children}) => <p className="text-slate-300 mb-4 leading-7">{children}</p>,
                    a: ({href, children}) => <a href={href} className="text-cyan-400 hover:text-cyan-300 underline">{children}</a>,
                    blockquote: ({children}) => (
                      <blockquote className="border-l-4 border-cyan-500 pl-4 py-2 my-4 bg-cyan-950/20 text-slate-300 rounded-r">
                        {children}
                      </blockquote>
                    ),
                    table: ({children}) => (
                      <div className="overflow-auto my-4">
                        <table className="border-collapse border border-white/10 w-full text-sm">
                          {children}
                        </table>
                      </div>
                    ),
                    th: ({children}) => <th className="border border-white/10 px-4 py-2 text-left text-cyan-300 font-semibold bg-slate-800/50">{children}</th>,
                    td: ({children}) => <td className="border border-white/10 px-4 py-2 text-slate-300">{children}</td>,
                    hr: () => <hr className="border-white/10 my-6" />,
                    strong: ({children}) => <strong className="text-white font-semibold">{children}</strong>,
                    em: ({children}) => <em className="text-slate-300">{children}</em>,
                  }}
                >
                  {result.answer}
                </ReactMarkdown>
              </div>
              
              <div className="grid gap-3 text-sm text-slate-400 sm:grid-cols-2 lg:grid-cols-4 border-t border-white/5 pt-4 mt-4">
                <div className="panel p-3">
                  <span className="block text-slate-500 text-xs">Модель</span>
                  <span className="text-white text-sm truncate">{result.model}</span>
                </div>
                <div className="panel p-3">
                  <span className="block text-slate-500 text-xs">Prompt токены</span>
                  <span className="text-white">{result.usage?.prompt_tokens ?? "n/a"}</span>
                </div>
                <div className="panel p-3">
                  <span className="block text-slate-500 text-xs">Токены ответа</span>
                  <span className="text-white">{result.usage?.completion_tokens ?? "n/a"}</span>
                </div>
                <div className="panel p-3 border-cyan-500/30 bg-cyan-950/20">
                  <span className="block text-cyan-400 text-xs">🧠 Reasoning</span>
                  <span className="text-cyan-300 font-bold">{result.usage?.reasoning_tokens ?? "n/a"}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}