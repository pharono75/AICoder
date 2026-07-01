import { DocSection, PageHero } from "../components";

export default function Privacy() {
  return (
    <>
      <PageHero kicker="Политика данных" title="Как AI Coder обрабатывает данные.">
        <p>
          Последнее обновление: 1 июля 2026. Эта страница объясняет, какие данные может обрабатывать расширение, зачем они нужны и как минимизировать логи.
        </p>
      </PageHero>
      <div className="page-shell space-y-6">
        <DocSection title="Данные расширения">
          <p>
            AI Coder может обрабатывать активное выделение в редакторе, путь файла, language id, инструкцию пользователя, настройки модели, metadata ответа и счётчики использования. Расширение не должно собирать unrelated files, browser history, пароли, SSH keys, env-файлы или git-ignored secrets.
          </p>
        </DocSection>
        <DocSection title="Запросы к model providers">
          <p>
            Когда пользователь просит сгенерировать, объяснить, отрефакторить или протестировать код, релевантный prompt и выбранный context могут быть отправлены на API server и затем в выбранный LLM provider. Не прикрепляйте приватный код, который нельзя передавать сторонним processors.
          </p>
        </DocSection>
        <DocSection title="Логирование и хранение">
          <p>
            Operational logs должны предпочитать metadata: timestamp, model id, latency, token counts, error class и installation id. Prompt bodies и исходный код лучше redacted/omitted, кроме явного support case с воспроизводимым примером.
          </p>
        </DocSection>
        <DocSection title="Optional rewarded actions">
          <p>
            Некоторые экспериментальные сборки могут включать optional rewarded actions, связанные с кредитами. Они не являются главным способом доступа, не описывают ценность продукта и должны быть явно раскрыты внутри продукта, если включены.
          </p>
        </DocSection>
      </div>
    </>
  );
}
