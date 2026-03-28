import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creator Dashboard | Jobfluencer",
  description:
    "Manage your jobs, messages, and profile on the Jobfluencer creator dashboard.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
