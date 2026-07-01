import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin", "cyrillic"], variable: "--font-mono" });

const navItems = [
  ["Документация", "/docs"],
  ["Архитектура", "/architecture"],
  ["Установка", "/download"],
  ["Протестировать", "/test"],
  ["Блог", "/blog"],
  ["История", "/changelog"],
  ["FAQ", "/faq"],
  ["Контакты", "/contact"],
];

export const metadata: Metadata = {
  title: "AI Coder - AI-агент для VS Code",
  description:
    "Официальный сайт и техническая документация AI Coder: экспериментального VS Code расширения с AI-агентом и интеграцией LLM API.",
  keywords: [
    "VS Code extension",
    "AI coding agent",
    "developer tool",
    "OpenRouter",
    "LLM API",
    "code generation",
    "refactoring",
    "test generation",
  ],
  authors: [{ name: "AI Coder Project" }],
  openGraph: {
    title: "AI Coder - AI-агент для VS Code",
    description:
      "Документация, архитектура, примеры, история версий и политика данных для AI-инструмента разработчика.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${mono.variable}`}>
        <div className="min-h-screen bg-[#07080d] text-slate-100">
          <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07080d]/88 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
              <Link href="/" className="flex items-center gap-3 font-semibold text-white">
                <span className="grid h-8 w-8 place-items-center rounded bg-cyan-400 text-sm font-black text-slate-950">
                  AC
                </span>
                <span>AI Coder</span>
              </Link>
              <nav className="hidden items-center gap-5 text-sm text-slate-400 lg:flex">
                {navItems.map(([label, href]) => (
                  <Link key={href} href={href} className="transition hover:text-white">
                    {label}
                  </Link>
                ))}
              </nav>
              <Link className="btn btn-primary px-4 py-2 text-sm" href="/docs">
                Установить
              </Link>
            </div>
          </header>
          <main>{children}</main>
          <footer className="border-t border-white/10 bg-slate-950/40">
            <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm text-slate-400 sm:px-6 md:grid-cols-[1.2fr_2fr] lg:px-8">
              <div>
                <div className="mb-3 font-semibold text-white">AI Coder</div>
                <p className="max-w-md">
                  Open Source / Research project для изучения AI-assisted development внутри VS Code. Текущая публичная версия: v0.3.2-beta.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <Link href="/privacy" className="hover:text-white">Политика данных</Link>
                <Link href="/terms" className="hover:text-white">Условия</Link>
                <Link href="/contact" className="hover:text-white">Контакты</Link>
                <a href="https://github.com/aicoder-dev/aicoder" className="hover:text-white">GitHub</a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
