type MessagePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MessagePage({ params }: MessagePageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-white px-6 py-20 text-black md:px-12">
      <div className="mx-auto w-full max-w-4xl">
        <p className="text-xs tracking-[0.28em] uppercase text-zinc-600">
          Messaging Placeholder
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          Message {id}
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-600">
          Backend-ready route for a brand ↔ creator conversation thread.
        </p>
      </div>
    </main>
  );
}

