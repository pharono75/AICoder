import { DocSection, PageHero } from "../components";

export default function About() {
  return (
    <>
      <PageHero kicker="О проекте" title="AI Coder — research-oriented инструмент разработчика.">
        <p>
          Проект исследует, как AI coding agent может работать внутри VS Code без скрытой архитектуры, непрозрачного data flow и завышенных обещаний.
        </p>
      </PageHero>
      <div className="page-shell space-y-6">
        <DocSection title="Цели проекта">
          <p>
            AI Coder сфокусирован на практических сценариях: генерировать небольшие участки кода, объяснять алгоритмы, писать тесты и планировать рефакторинг. Продукт помогает review, но не заменяет инженерное мышление.
          </p>
        </DocSection>
        <DocSection title="Open source / research positioning">
          <p>
            Публичный сайт документирует расширение как техническую систему: WebView frontend, API backend, LLM provider layer, caching, auth, rate limits и privacy boundaries. Во время beta проект может быстро меняться.
          </p>
        </DocSection>
      </div>
    </>
  );
}
