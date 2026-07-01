import Link from "next/link";
import { Code2, GitBranch, Lock, MessagesSquare, Play, Server } from "lucide-react";
import { CodeBlock, InlineLink } from "./components";
import { TerminalSimulator } from "@/components/TerminalSimulator";

const features = [
  {
    icon: Code2,
    title: "Генерация кода",
    text: "Создание типизированных функций, небольших модулей, миграций, CLI-скриптов и UI-компонентов по конкретному описанию задачи.",
  },
  {
    icon: GitBranch,
    title: "Планы рефакторинга",
    text: "Агент анализирует выбранный код, объясняет связанность и предлагает план патча до изменения файлов.",
  },
  {
    icon: MessagesSquare,
    title: "Объяснение алгоритмов",
    text: "Незнакомый код превращается в понятное объяснение со сложностью, граничными случаями и идеями для тестов.",
  },
  {
    icon: Play,
    title: "Генерация тестов",
    text: "Создание unit-тестов и table-driven сценариев из активного файла или выбранной функции.",
  },
  {
    icon: Server,
    title: "LLM API слой",
    text: "Интеграция OpenRouter или совместимого провайдера через серверный proxy с rate limiting и аудитом.",
  },
  {
    icon: Lock,
    title: "Границы данных",
    text: "Контекст рабочей области отправляется только для конкретной задачи; секреты и ignored-файлы должны исключаться.",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(34,211,238,0.10),transparent_34%,rgba(74,222,128,0.08)_74%,transparent)]" />
        <div className="page-shell relative grid min-h-[calc(100vh-65px)] items-center gap-12 py-14 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="section-kicker">VS Code Extension / AI Agent</p>
            <h1 className="text-5xl font-semibold tracking-tight text-white md:text-7xl">
              AI Coder
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-300">
              AI Coder — экспериментальный developer tool для VS Code: локальный WebView-интерфейс, API backend и слой интеграции с LLM для генерации кода, рефакторинга, объяснений и тестов.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/docs" className="btn btn-primary px-5 py-3">
                Документация
              </Link>
              <Link href="/architecture" className="btn btn-secondary px-5 py-3">
                Архитектура
              </Link>
            </div>
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-sm text-slate-400">
              <div className="panel p-3"><b className="block text-white">v0.3.2</b> beta-канал</div>
              <div className="panel p-3"><b className="block text-white">Open</b> research project</div>
              <div className="panel p-3"><b className="block text-white">BYO key</b> OpenRouter-ready</div>
            </div>
          </div>

          <TerminalSimulator />
        </div>
      </section>

      <section className="page-shell">
        <div className="mb-10 max-w-3xl">
          <p className="section-kicker">Продуктовая поверхность</p>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">Сайт выглядит как developer tool и работает как документация.</h2>
          <p className="mt-4 leading-7 text-slate-300">
            Сайт полезен без регистрации: он объясняет установку, настройку API, архитектуру расширения, поток промптов, границы данных и troubleshooting. Кредиты описаны как учёт использования. Optional rewarded actions остаются второстепенным экспериментальным механизмом, а не смыслом продукта.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article key={feature.title} className="doc-panel">
                <Icon className="mb-5 h-6 w-6 text-cyan-300" />
                <h3 className="mb-2 text-lg font-semibold text-white">{feature.title}</h3>
                <p className="leading-7 text-slate-400">{feature.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-950/35">
        <div className="page-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="section-kicker">Поток запроса</p>
            <h2 className="text-3xl font-semibold text-white">От выделения в редакторе до ответа модели.</h2>
            <p className="mt-4 leading-7 text-slate-300">
              AI Coder делает взаимодействие явным. Расширение берёт выделенный текст и инструкцию пользователя, нормализует контекст, отправляет ограниченный запрос через API server и возвращает объяснение или patch preview в WebView.
            </p>
          </div>
          <div className="grid gap-3 text-sm">
            {["Команда VS Code", "Состояние WebView", "API server", "LLM provider", "Patch preview"].map((step, index) => (
              <div key={step} className="panel flex items-center gap-4 p-4">
                <span className="grid h-8 w-8 place-items-center rounded bg-cyan-300 text-slate-950">{index + 1}</span>
                <span className="font-medium text-white">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell grid gap-8 lg:grid-cols-2">
        <div>
          <p className="section-kicker">Пример</p>
          <h2 className="text-3xl font-semibold text-white">Практичный промпт вместо магических обещаний.</h2>
          <p className="mt-4 leading-7 text-slate-300">
            Хорошие результаты получаются из ограниченных запросов. Расширение поощряет команды, где указаны файлы, ограничения, ожидаемый результат и критерии проверки.
          </p>
        </div>
        <CodeBlock>{`/test src/pricing/calculateTotal.ts

Сгенерируй Vitest cases для:
- пустой корзины
- процентной скидки
- округления налога
- защиты от отрицательного количества

Production-код не менять.
Сначала верни patch preview.`}</CodeBlock>
      </section>

      <section className="page-shell pt-0">
        <div className="panel grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="section-kicker">Прозрачный статус</p>
            <h2 className="text-2xl font-semibold text-white">Экспериментальный open-source/research проект.</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-300">
              AI Coder не является финансовым продуктом и не обещает заработок. Это технический проект расширения для IDE, сфокусированный на помощи разработчику, prompt engineering и безопасной интеграции с LLM API.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <InlineLink href="/privacy">Политика данных</InlineLink>
            <InlineLink href="/terms">Условия</InlineLink>
            <InlineLink href="/test">Протестировать</InlineLink>
          </div>
        </div>
      </section>
    </>
  );
}
