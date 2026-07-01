import Link from "next/link";

export function PageHero({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-white/10 bg-slate-950/35">
      <div className="page-shell py-14">
        <p className="section-kicker">{kicker}</p>
        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
          {title}
        </h1>
        <div className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{children}</div>
      </div>
    </section>
  );
}

export function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="code-block">
      <code>{children}</code>
    </pre>
  );
}

export function DocSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="doc-panel scroll-mt-24">
      <h2 className="mb-4 text-2xl font-semibold text-white">{title}</h2>
      <div className="space-y-4 leading-7 text-slate-300">{children}</div>
    </section>
  );
}

export function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="font-medium text-cyan-300 hover:text-cyan-200">
      {children}
    </Link>
  );
}
