"use client";

import { ClientSidebar } from "./ClientSidebar";
import { useClientDashboardStore } from "@/store/clientDashboardStore";
import { ClientDashboardHome } from "./views/ClientDashboardHome";
import { PostJobView } from "./views/PostJobView";
import { MyCampaignsView } from "./views/MyCampaignsView";
import { ApplicationsView } from "./views/ApplicationsView";
import { ClientMessagesView } from "./views/ClientMessagesView";
import { PaymentsView } from "./views/PaymentsView";
import { ClientSettingsView } from "./views/ClientSettingsView";

export function ClientDashboardShell() {
  const activeTab = useClientDashboardStore((s) => s.activeTab);
  const sidebarCollapsed = useClientDashboardStore((s) => s.sidebarCollapsed);

  const renderView = () => {
    switch (activeTab) {
      case "dashboard":
        return <ClientDashboardHome />;
      case "post-job":
        return <PostJobView />;
      case "campaigns":
        return <MyCampaignsView />;
      case "applications":
        return <ApplicationsView />;
      case "messages":
        return <ClientMessagesView />;
      case "payments":
        return <PaymentsView />;
      case "settings":
        return <ClientSettingsView />;
      default:
        return <ClientDashboardHome />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#FAFAFA] dark:bg-black transition-colors duration-300">
      <ClientSidebar />
      <main
        className={[
          "flex-1 overflow-y-auto transition-all duration-300",
          sidebarCollapsed ? "ml-[72px]" : "ml-[256px]",
        ].join(" ")}
      >
        <div className="min-h-full">{renderView()}</div>
      </main>
    </div>
  );
}
