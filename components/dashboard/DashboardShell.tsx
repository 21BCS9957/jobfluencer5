"use client";

import { Sidebar } from "./Sidebar";
import { useDashboardStore } from "@/store/dashboardStore";
import { useJobsStore } from "@/store/jobsStore";
import { DashboardHome } from "./views/DashboardHome";
import { MessagesView } from "./views/MessagesView";
import { MyJobsView } from "./views/MyJobsView";
import { ExploreJobsView } from "./views/ExploreJobsView";
import { ProfileView } from "./views/ProfileView";
import { SettingsView } from "./views/SettingsView";
import { JobDetailModal } from "@/components/browse/JobDetailModal";
import { ApplyModal } from "@/components/browse/ApplyModal";

export function DashboardShell() {
  const activeTab = useDashboardStore((s) => s.activeTab);
  const sidebarCollapsed = useDashboardStore((s) => s.sidebarCollapsed);
  const selectedJob = useJobsStore((s) => s.selectedJob);
  const applyingJob = useJobsStore((s) => s.applyingJob);

  const renderView = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardHome />;
      case "messages":
        return <MessagesView />;
      case "my-jobs":
        return <MyJobsView />;
      case "explore":
        return <ExploreJobsView />;
      case "profile":
        return <ProfileView />;
      case "settings":
        return <SettingsView />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#FAFAFA] dark:bg-black transition-colors duration-300">
      <Sidebar />
      <main
        className={[
          "flex-1 overflow-y-auto transition-all duration-300",
          sidebarCollapsed ? "ml-[72px]" : "ml-[240px]",
        ].join(" ")}
      >
        <div className="min-h-full">
          {renderView()}
        </div>
      </main>

      {/* Browse Jobs modals — available from dashboard explore view */}
      {selectedJob && <JobDetailModal />}
      {applyingJob && <ApplyModal />}
    </div>
  );
}
