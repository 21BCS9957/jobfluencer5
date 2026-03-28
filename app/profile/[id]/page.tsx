type ProfilePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-white px-6 py-20 text-black md:px-12">
      <div className="mx-auto w-full max-w-4xl">
        <p className="text-xs tracking-[0.28em] uppercase text-zinc-600">
          Profile Placeholder
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">{id}</h1>
        <p className="mt-4 max-w-2xl text-zinc-600">
          This is a backend-ready route. Replace this with real creator profile
          data and messaging entrypoints.
        </p>
      </div>
    </main>
  );
}

