import Link from "next/link";

export default function CreatorsPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-20 text-black md:px-12">
      <div className="mx-auto w-full max-w-5xl">
        <p className="text-xs tracking-[0.28em] uppercase text-zinc-600">
          Directory Placeholder
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight">
          All Creators
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-600">
          Backend-ready list route. Plug your API and filters here.
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-full border border-black/20 px-4 text-xs tracking-[0.18em] uppercase text-black transition-colors hover:bg-black hover:text-white"
          >
            Back Home
          </Link>
        </div>
      </div>
    </main>
  );
}

