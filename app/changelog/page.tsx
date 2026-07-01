import { PageHero } from "../components";

const releases = [
  ["v0.3.2-beta", "2026-07-01", "Улучшена обработка ошибок провайдера, добавлена metadata для patch preview, уточнена политика данных."],
  ["v0.3.1-beta", "2026-06-20", "Добавлены шаблоны генерации тестов и более безопасные значения max-context по умолчанию."],
  ["v0.3.0-beta", "2026-06-05", "Добавлен API server boundary, usage ledger и OpenRouter-compatible provider adapter."],
  ["v0.2.0-alpha", "2026-05-12", "Добавлена история WebView-чата, команда explain-selection и базовые prompts для рефакторинга."],
];

export default function Changelog() {
  return (
    <>
      <PageHero kicker="История версий" title="Релизы, исправления и статус проекта.">
        <p>
          AI Coder сейчас находится в beta/research стадии. Изменения документируются с фокусом на поведение продукта и интеграции.
        </p>
      </PageHero>
      <div className="page-shell space-y-4">
        {releases.map(([version, date, text]) => (
          <article key={version} className="doc-panel">
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-semibold text-white">{version}</h2>
              <time className="text-sm text-slate-500">{date}</time>
            </div>
            <p className="leading-7 text-slate-300">{text}</p>
          </article>
        ))}
      </div>
    </>
  );
}
