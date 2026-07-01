import { CodeBlock, DocSection, PageHero } from "../components";

export default function Architecture() {
  return (
    <>
      <PageHero kicker="Архитектура" title="IDE-клиент, защищённый API слой и адаптеры LLM провайдеров.">
        <p>
          AI Coder разделяет UX редактора и доступ к моделям. VS Code extension отвечает за команды и WebView, API server — за политику, лимиты и безопасность, LLM layer — за адаптацию запросов к OpenRouter или совместимым провайдерам.
        </p>
      </PageHero>
      <div className="page-shell space-y-6">
        <DocSection title="Поток системы">
          <div className="grid gap-3 text-sm md:grid-cols-5">
            {["VS Code", "WebView", "API server", "LLM layer", "Patch/result"].map((item, index) => (
              <div key={item} className="panel p-4">
                <div className="mb-3 text-cyan-300">0{index + 1}</div>
                <div className="font-semibold text-white">{item}</div>
              </div>
            ))}
          </div>
          <p>
            WebView не должен напрямую знать ключ OpenRouter. Он отправляет нормализованный запрос в extension host, затем запрос попадает на API server. Сервер применяет auth, quota checks, context filters и provider adapter, после чего возвращает streamed response или обычный JSON.
          </p>
        </DocSection>

        <DocSection title="Frontend: VS Code WebView">
          <p>
            Frontend — локальная панель WebView с историей запросов, шаблонами задач, patch preview и быстрыми настройками. Коммуникация с extension host идёт через <code>postMessage</code>, чтобы React-компоненты не смешивались с VS Code API.
          </p>
          <CodeBlock>{`vscode.postMessage({
  type: "agent.request",
  payload: {
    command: "refactor",
    selection,
    activeFile,
    constraints: ["сохранить публичный API", "сначала patch preview"]
  }
});`}</CodeBlock>
        </DocSection>

        <DocSection title="Backend: политика и наблюдаемость">
          <p>
            Backend валидирует запросы, определяет installation token или пользователя, считает ожидаемую стоимость токенов, применяет rate limiting и хранит минимальную telemetry. В логах полезнее хранить model id, latency, token counts и error class, а не полный исходный код.
          </p>
        </DocSection>

        <DocSection title="LLM layer, caching, auth и rate limits">
          <p>
            Provider adapters переводят единый внутренний формат запроса в формат конкретного API. Кешировать можно списки моделей, pricing metadata и повторяемые публичные ответы документации. Сгенерированный код пользователя не должен кешироваться между пользователями без явного согласия.
          </p>
          <p>
            Auth может начинаться с installation tokens, затем перейти к GitHub/OAuth. Rate limiting лучше комбинировать по installation, IP и provider limit. Кредиты стоит показывать как прозрачный usage ledger, а не рекламное обещание.
          </p>
          <CodeBlock>{`request -> auth guard -> quota check -> context filter
        -> provider adapter -> streamed response -> usage ledger`}</CodeBlock>
        </DocSection>
      </div>
    </>
  );
}
