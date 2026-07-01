import { DocSection, PageHero } from "../components";

export default function Terms() {
  return (
    <>
      <PageHero kicker="Условия" title="Условия использования и ограничения.">
        <p>
          AI Coder — экспериментальный developer tool. Используйте его как помощника, а не как автономный источник истины для production-кода.
        </p>
      </PageHero>
      <div className="page-shell space-y-6">
        <DocSection title="Допустимое использование">
          <p>
            Пользователь отвечает за код, который отправляет model providers, и за ревью результата. Не используйте расширение для данных, которые нельзя передавать выбранному провайдеру.
          </p>
        </DocSection>
        <DocSection title="Сгенерированный результат">
          <p>
            Ответ модели может быть неполным, небезопасным или несовместимым с проектом. Проверяйте diffs, запускайте тесты и применяйте обычный code review перед merge.
          </p>
        </DocSection>
        <DocSection title="Лимиты сервиса">
          <p>
            Запросы могут ограничиваться provider quota, rate limiting, abuse controls или beta availability. Кредиты используются для прозрачного учёта и не являются деньгами, зарплатой или гарантированным доступом.
          </p>
        </DocSection>
      </div>
    </>
  );
}
