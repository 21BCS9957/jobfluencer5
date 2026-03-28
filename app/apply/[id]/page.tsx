type ApplyPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ApplyPage({ params }: ApplyPageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white md:px-12">
      <div className="mx-auto w-full max-w-4xl">
        <p className="text-xs tracking-[0.28em] uppercase text-white/60">
          Apply Placeholder
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          Apply to {id}
        </h1>
        <p className="mt-4 max-w-2xl text-white/70">
          Backend-ready application route. Add your form, eligibility checks,
          and submission here.
        </p>
      </div>
    </main>
  );
}

