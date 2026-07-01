import { DocSection, PageHero } from "../components";

export default function FAQ() {
  return (
    <>
      <PageHero kicker="FAQ" title="Частые вопросы об AI Coder.">
        <p>
          Короткие ответы о работе расширения, кредитах, подключении OpenRouter и безопасности данных.
        </p>
      </PageHero>
      <div className="page-shell space-y-6">
        <DocSection title="Как работает расширение?">
          <p>
            Расширение добавляет команды VS Code и WebView-панель. Пользовательский запрос превращается в agent request, при необходимости дополняется выбранным workspace context и отправляется через API layer к LLM provider.
          </p>
        </DocSection>
        <DocSection title="Что такое кредиты?">
          <p>
            Кредиты — это usage ledger для model calls и лимитов сервиса. Они помогают объяснять потребление и контролировать стоимость провайдера. Это не обещание заработка и не финансовая reward system.
          </p>
        </DocSection>
        <DocSection title="Как подключить OpenRouter?">
          <p>
            Создайте ключ OpenRouter, сохраните его на сервере в <code>OPENROUTER_API_KEY</code>, укажите модель в <code>OPENROUTER_MODEL</code> и проверьте запрос на странице “Протестировать”. Ключ нельзя отправлять в браузер.
          </p>
        </DocSection>
        <DocSection title="Безопасен ли мой код?">
          <p>
            Любая интеграция с remote LLM означает, что выбранный контекст может уйти провайдеру. AI Coder снижает риск: делает контекст явным, исключает ignored-файлы по умолчанию и документирует, что отправляется.
          </p>
        </DocSection>
      </div>
    </>
  );
}
