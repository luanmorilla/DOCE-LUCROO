 "use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/components/layout/navigation";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="surface fixed inset-x-4 bottom-4 z-40 rounded-[28px] px-3 py-2 lg:hidden">
      <div className="grid grid-cols-4 gap-2">
        {navigation.slice(0, 4).map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center rounded-2xl px-2 py-2 text-[11px] font-medium",
                active ? "bg-pink-500 text-white" : "text-neutral-700"
              )}
            >
              <Icon className="mb-1 h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
