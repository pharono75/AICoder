import { PageHero } from "../components";
import { OpenRouterTester } from "./OpenRouterTester";

export default function TestPage() {
  return (
    <>
      <PageHero kicker="Протестировать" title="Проверить GPT-запрос через OpenRouter.">
        <p>
          Эта страница отправляет prompt на серверный маршрут <code>/api/openrouter</code>. Сервер читает <code>OPENROUTER_API_KEY</code>, вызывает OpenRouter и возвращает ответ модели в интерфейс.
        </p>
      </PageHero>
      <div className="page-shell">
        <OpenRouterTester />
      </div>
    </>
  );
}
