export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center bg-zinc-50 px-6 py-24 font-sans dark:bg-black">
      <section className="w-full max-w-3xl rounded-3xl border border-black/5 bg-white p-10 shadow-sm dark:border-white/10 dark:bg-zinc-950">
        <span className="inline-flex rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
          Next.js + Turbopack + Tailwind CSS
        </span>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Mofeverso Portifolio
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          This project has been initialized with Next.js App Router, Tailwind
          CSS, and Turbopack for local development.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js Docs
          </a>
          <a
            className="rounded-full border border-black/10 px-5 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-black/5 dark:border-white/15 dark:text-zinc-50 dark:hover:bg-white/10"
            href="https://tailwindcss.com/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tailwind Docs
          </a>
        </div>
      </section>
    </main>
  );
}
