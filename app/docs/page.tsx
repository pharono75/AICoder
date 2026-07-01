import { CodeBlock, DocSection, InlineLink, PageHero } from "../components";

const links = [
  ["Быстрый старт", "#start"],
  ["Настройка API", "#api"],
  ["Команды", "#commands"],
  ["Примеры", "#examples"],
  ["Troubleshooting", "#troubleshooting"],
];

export default function Docs() {
  return (
    <>
      <PageHero kicker="Документация" title="Как пользоваться AI Coder после установки.">
        <p>
          Этот раздел описывает рабочие сценарии расширения: настройку LLM API, команды агента, примеры промптов, ограничения контекста и диагностику ошибок. Инструкция установки вынесена отдельно на страницу <InlineLink href="/download">Установка</InlineLink>.
        </p>
      </PageHero>
      <div className="page-shell grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-2 text-sm text-slate-400">
            {links.map(([label, href]) => (
              <a key={href} href={href} className="block hover:text-white">{label}</a>
            ))}
          </nav>
        </aside>
        <div className="space-y-6">
          <DocSection id="start" title="Быстрый старт">
            <p>
              Откройте командную палитру VS Code и выполните <code>AI Coder: Open Agent</code>. В WebView появится терминальный интерфейс агента. Базовый сценарий: выбрать фрагмент кода, описать задачу и получить объяснение, patch preview или набор тестов.
            </p>
            <p>
              AI Coder лучше работает с узкими запросами: укажите файл, желаемое поведение, ограничения и способ проверки. Для больших изменений просите план до правки файлов.
            </p>
          </DocSection>

          <DocSection id="api" title="Настройка API через OpenRouter">
            <p>
              Рекомендуемый режим — использовать OpenRouter или совместимый OpenAI-style endpoint через серверный API. Ключ провайдера хранится на сервере в <code>OPENROUTER_API_KEY</code>, а браузер и WebView обращаются только к вашим внутренним маршрутам.
            </p>
            <CodeBlock>{`OPENROUTER_API_KEY=sk-or-v1-...
OPENROUTER_MODEL=openai/gpt-4o-mini
NEXT_PUBLIC_APP_URL=http://localhost:3000`}</CodeBlock>
            <p>
              В настройках расширения укажите базовый URL вашего backend. Для локальной разработки это обычно <code>http://localhost:3000</code>, для production — домен сайта или API server.
            </p>
          </DocSection>

          <DocSection id="commands" title="Основные команды агента">
            <ul className="list-disc space-y-2 pl-5">
              <li><code>/generate</code> — создать код по описанию задачи.</li>
              <li><code>/refactor</code> — предложить безопасный план изменения существующего кода.</li>
              <li><code>/explain</code> — объяснить алгоритм, сложность и edge cases.</li>
              <li><code>/test</code> — сгенерировать unit-тесты для выбранной функции или файла.</li>
              <li><code>/architecture</code> — получить план модулей, границ ответственности и интеграций.</li>
            </ul>
          </DocSection>

          <DocSection id="examples" title="Примеры промптов">
            <CodeBlock>{`/generate app/api/invoices/route.ts
Создай POST handler: zod validation, 400 на invalid input,
typed InvoiceDraft на выходе. Без подключения базы.

/refactor src/cache.ts
Отдели memory cache от provider client.
Публичные имена функций сохранить.
Сначала верни план и patch preview.

/explain src/routing/score.ts
Объясни алгоритм ранжирования, сложность, edge cases
и какие тесты нужны.

/test src/routing/score.ts
Сгенерируй Vitest table cases для empty input,
tied scores и missing optional fields.`}</CodeBlock>
            <p>
              Кредиты — это единица учёта потребления модели и лимитов сервиса. Optional rewarded actions могут появляться как дополнительный эксперимент, но они не являются главным способом доступа и не описывают ценность продукта.
            </p>
          </DocSection>

          <DocSection id="troubleshooting" title="Troubleshooting">
            <ul className="list-disc space-y-2 pl-5">
              <li><b>401/403:</b> ключ OpenRouter отсутствует, неверен или модель недоступна для аккаунта.</li>
              <li><b>429:</b> превышен rate limit; уменьшите параллельные запросы или выберите другой лимит.</li>
              <li><b>Context too large:</b> сократите выделение, прикреплённые файлы или число context files.</li>
              <li><b>Пустой WebView:</b> перезагрузите окно VS Code и откройте <code>Developer: Toggle Developer Tools</code>.</li>
            </ul>
            <p>
              Для схемы системы смотрите <InlineLink href="/architecture">Архитектуру</InlineLink>, для политики обработки данных — <InlineLink href="/privacy">Политику данных</InlineLink>.
            </p>
          </DocSection>
        </div>
      </div>
    </>
  );
}
