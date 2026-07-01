import Link from "next/link";
import { CodeBlock, PageHero } from "../components";

export default function Download() {
  return (
    <>
      <PageHero kicker="Установка" title="Установить AI Coder в VS Code.">
        <p>
          Страница установки отделена от документации: здесь только каналы поставки, локальная сборка VSIX и первые действия после установки.
        </p>
      </PageHero>
      <div className="page-shell grid gap-6 lg:grid-cols-2">
        <section className="doc-panel">
          <h2 className="mb-3 text-2xl font-semibold text-white">Marketplace channel</h2>
          <p className="leading-7 text-slate-300">
            Публичный marketplace-канал предназначен для подписанных релизов с changelog и понятной версией. Если listing ещё недоступен, используйте development VSIX.
          </p>
          <Link href="/changelog" className="mt-5 inline-flex text-cyan-300 hover:text-cyan-200">
            Посмотреть историю версий
          </Link>
        </section>
        <section className="doc-panel">
          <h2 className="mb-3 text-2xl font-semibold text-white">Development VSIX</h2>
          <p className="mb-4 leading-7 text-slate-300">
            Соберите пакет локально, затем установите его через командную палитру VS Code.
          </p>
          <CodeBlock>{`npm install
npm run build
vsce package

# VS Code
Extensions: Install from VSIX...`}</CodeBlock>
        </section>
        <section className="doc-panel lg:col-span-2">
          <h2 className="mb-3 text-2xl font-semibold text-white">После установки</h2>
          <ol className="list-decimal space-y-2 pl-5 leading-7 text-slate-300">
            <li>Откройте командную палитру VS Code.</li>
            <li>Запустите <code>AI Coder: Open Agent</code>.</li>
            <li>Укажите backend URL и модель в настройках расширения.</li>
            <li>Проверьте OpenRouter-запрос на странице <Link href="/test" className="text-cyan-300 hover:text-cyan-200">Протестировать</Link>.</li>
          </ol>
        </section>
      </div>
    </>
  );
}
