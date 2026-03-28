import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Dashboard | Jobfluencer",
  description:
    "Manage campaigns, review applications, hire creators, and handle escrow payments on the Jobfluencer brand dashboard.",
};

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
