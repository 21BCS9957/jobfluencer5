type SignupPageProps = {
  searchParams: Promise<{
    role?: string;
  }>;
};

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const { role } = await searchParams;
  const normalizedRole = role === "brand" ? "brand" : "freelancer";

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="glass-panel w-full max-w-xl rounded-3xl p-8 md:p-10">
        <p className="text-xs tracking-[0.24em] uppercase text-white/60">
          Signup Flow Placeholder
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          Continue as {normalizedRole === "brand" ? "Brand" : "Freelancer"}
        </h1>
        <p className="mt-4 text-white/70">
          This route is backend-ready. Connect your auth provider and onboarding
          form here.
        </p>
      </div>
    </main>
  );
}
