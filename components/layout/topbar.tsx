 "use client";

import Link from "next/link";
import { Bell, Search, Sparkles } from "lucide-react";
import { useAppData } from "@/contexts/app-data-context";

export function Topbar() {
  const { state } = useAppData();

  return (
    <header className="surface sticky top-4 z-30 mb-5 flex items-center justify-between rounded-[28px] px-4 py-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink-600">
          Doce Lucro
        </p>
        <h1 className="text-lg font-bold leading-tight md:text-2xl">
          Gestão elegante para sua confeitaria
        </h1>
        <p className="text-sm text-neutral-500">{state.settings.city}</p>
      </div>

      <div className="hidden items-center gap-3 md:flex">
        <div className="flex items-center gap-2 rounded-2xl border border-pink-100 bg-pink-50/60 px-4 py-3 text-sm text-neutral-500">
          <Search className="h-4 w-4 text-pink-500" />
          Busca rápida visual
        </div>
        <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-pink-100 bg-white text-neutral-700">
          <Bell className="h-5 w-5" />
        </button>
        <Link
          href="/reports"
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-200"
        >
          <Sparkles className="h-4 w-4" />
          Ver relatórios
        </Link>
      </div>
    </header>
  );
}
