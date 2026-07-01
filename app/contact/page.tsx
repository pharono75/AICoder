import { PageHero } from "../components";

export default function Contact() {
  return (
    <>
      <PageHero kicker="Контакты" title="Поддержка и ссылки проекта.">
        <p>
          Вопросы по установке, OpenRouter, privacy или воспроизводимым ошибкам можно отправлять через каналы ниже.
        </p>
      </PageHero>
      <div className="page-shell grid gap-4 md:grid-cols-3">
        <a className="doc-panel hover:border-cyan-300/40" href="mailto:support@aicoder.dev">
          <h2 className="mb-2 text-xl font-semibold text-white">Email support</h2>
          <p className="text-slate-400">support@aicoder.dev</p>
        </a>
        <a className="doc-panel hover:border-cyan-300/40" href="https://github.com/aicoder-dev/aicoder/issues">
          <h2 className="mb-2 text-xl font-semibold text-white">GitHub issues</h2>
          <p className="text-slate-400">Баги, воспроизводимые ошибки и обсуждение функций.</p>
        </a>
        <a className="doc-panel hover:border-cyan-300/40" href="https://github.com/aicoder-dev/aicoder">
          <h2 className="mb-2 text-xl font-semibold text-white">Repository</h2>
          <p className="text-slate-400">Код, roadmap, releases и contribution notes.</p>
        </a>
      </div>
    </>
  );
}
