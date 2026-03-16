import { MobileNav } from "@/components/layout/mobile-nav";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell px-4 py-4 md:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1600px] gap-5">
        <Sidebar />
        <div className="min-w-0 flex-1 pb-28 lg:pb-8">
          <Topbar />
          {children}
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
