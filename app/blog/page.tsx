import { PageHero } from "../components";

const posts = [
  {
    title: "Как AI-агент работает внутри IDE",
    date: "2026-07-01",
    text: "IDE-агент — это не просто чат. Ему нужны сборщик контекста, планировщик, границы инструментов и поверхность ревью. Главная инженерная задача — понять, что модель имеет право видеть и что она имеет право менять. AI Coder по умолчанию работает с выделением, активным файлом и явно прикреплёнными материалами.",
  },
  {
    title: "Интеграция LLM API без утечки состояния редактора",
    date: "2026-06-26",
    text: "Вызовы провайдера лучше изолировать за серверным компонентом, если продукту нужны лимиты, usage accounting, routing моделей и rotation ключей. Расширение остаётся локальным по UX, а API layer занимается redaction, request validation и provider-specific ошибками.",
  },
  {
    title: "Оптимизация промптов для рефакторинга",
    date: "2026-06-19",
    text: "Хороший refactoring prompt называет файл, желаемый invariant, публичный API, который нельзя ломать, и команду проверки. Расплывчатые запросы провоцируют большие переписывания. Узкие запросы дают маленькие патчи, которые проще проверить.",
  },
  {
    title: "Практические кейсы: тесты, объяснения и architecture notes",
    date: "2026-06-12",
    text: "Самые полезные задачи агента обычно ограничены: объяснить незнакомую функцию, сгенерировать table-driven tests, набросать migration plan или описать связанность модулей. AI Coder проектируется вокруг таких повторяемых сценариев.",
  },
];

export default function Blog() {
  return (
    <>
      <PageHero kicker="Технический блог" title="Заметки об AI-assisted development системах.">
        <p>
          Статьи про дизайн агентов, интеграцию LLM в IDE, качество промптов и практические workflow разработчика.
        </p>
      </PageHero>
      <div className="page-shell grid gap-5">
        {posts.map((post) => (
          <article key={post.title} className="doc-panel">
            <div className="mb-2 text-sm text-slate-500">{post.date}</div>
            <h2 className="mb-3 text-2xl font-semibold text-white">{post.title}</h2>
            <p className="leading-7 text-slate-300">{post.text}</p>
          </article>
        ))}
      </div>
    </>
  );
}
