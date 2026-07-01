"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Loader2, Terminal } from "lucide-react";

const SCENARIOS = [
  {
    label: "Рефакторинг",
    input: "/refactor src/cache.ts — отдели память от клиента OpenRouter, публичный API не менять",
    output: [
      "Анализирую зависимости модуля cache.ts...",
      "Найдено: смешаны хранение, TTL и сетевой клиент.",
      "План: вынести MemoryCache, оставить getCachedCompletion(), добавить тесты TTL.",
      "Готов patch preview: 3 файла, 2 новых теста.",
    ],
  },
  {
    label: "Тесты",
    input: "/test src/pricing/calculateTotal.ts — пустая корзина, скидка, округление налога",
    output: [
      "Читаю сигнатуру функции и граничные условия...",
      "Формирую table-driven cases для Vitest.",
      "Проверяю, что production-код не меняется.",
      "Готово: 6 сценариев, включая отрицательное количество.",
    ],
  },
  {
    label: "Объяснение",
    input: "/explain src/routing/score.ts — объясни алгоритм ранжирования и сложность",
    output: [
      "Разбираю входные параметры и веса ранжирования...",
      "Сложность: O(n log n) из-за сортировки кандидатов.",
      "Риск: одинаковые score без стабильного tie-breaker.",
      "Рекомендация: добавить deterministic fallback по id.",
    ],
  },
];

export function TerminalSimulator() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [typedInput, setTypedInput] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const scenario = SCENARIOS[scenarioIndex];

  const outputText = useMemo(() => scenario.output.join("\n"), [scenario]);

  useEffect(() => {
    let cancelled = false;
    let charIndex = 0;

    setTypedInput("");
    setShowOutput(false);

    const typeNext = () => {
      if (cancelled) return;
      if (charIndex <= scenario.input.length) {
        setTypedInput(scenario.input.slice(0, charIndex));
        charIndex += 1;
        window.setTimeout(typeNext, 22);
        return;
      }

      window.setTimeout(() => {
        if (!cancelled) setShowOutput(true);
      }, 350);

      window.setTimeout(() => {
        if (!cancelled) {
          setScenarioIndex((current) => (current + 1) % SCENARIOS.length);
        }
      }, 5600);
    };

    typeNext();
    return () => {
      cancelled = true;
    };
  }, [scenario.input]);

  return (
    <div className="panel overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 bg-slate-950/80 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-300" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
        </div>
        <span className="text-xs text-slate-500">AI Coder Terminal</span>
      </div>

      <div className="grid min-h-[430px] grid-rows-[auto_1fr] bg-[#0b1020]">
        <div className="border-b border-white/10 px-5 py-4">
          <div className="mb-3 flex items-center gap-2 text-sm text-cyan-300">
            <Terminal className="h-4 w-4" />
            <span>{scenario.label}</span>
          </div>
          <div className="min-h-[56px] rounded border border-white/10 bg-black/25 p-4 font-mono text-sm leading-6 text-slate-100">
            <span className="text-emerald-300">developer@workspace</span>
            <span className="text-slate-500"> $ </span>
            {typedInput}
            <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-cyan-300" />
          </div>
        </div>

        <div className="p-5">
          <div className="mb-3 flex items-center gap-2 text-sm text-slate-400">
            {showOutput ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
            ) : (
              <Loader2 className="h-4 w-4 animate-spin text-cyan-300" />
            )}
            <span>{showOutput ? "Ответ агента" : "Ожидание завершения запроса"}</span>
          </div>
          <pre className="min-h-[170px] whitespace-pre-wrap rounded border border-white/10 bg-slate-950/70 p-4 font-mono text-sm leading-6 text-slate-300">
            {showOutput ? outputText : "Подготавливаю контекст, проверяю лимиты и строю запрос к LLM..."}
          </pre>
        </div>
      </div>
    </div>
  );
}
