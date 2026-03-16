 "use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CupSoda, Sparkles } from "lucide-react";
import { navigation } from "@/components/layout/navigation";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="surface hidden h-[calc(100vh-2rem)] w-72 shrink-0 rounded-[28px] p-5 lg:flex lg:flex-col">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-pink-500 to-violet-600 text-white shadow-lg shadow-pink-200">
          <CupSoda className="h-7 w-7" />
        </div>
        <div>
          <p className="text-xl font-bold">Doce Lucro</p>
          <p className="text-sm text-neutral-500">Gestão completa da sua confeitaria</p>
        </div>
      </div>

      <div className="mb-4 rounded-3xl bg-gradient-to-br from-pink-500/10 via-white to-violet-500/10 p-4">
        <div className="mb-2 inline-flex rounded-full bg-pink-500/10 p-2 text-pink-600">
          <Sparkles className="h-4 w-4" />
        </div>
        <p className="font-semibold">Painel premium e organizado</p>
        <p className="mt-1 text-sm text-neutral-600">
          Cada módulo está separado para você editar sem bagunçar o restante do projeto.
        </p>
      </div>

      <nav className="flex-1 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all",
                active
                  ? "bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-lg shadow-pink-200"
                  : "text-neutral-700 hover:bg-pink-500/8"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="rounded-3xl border border-pink-100 bg-pink-50/60 p-4">
        <p className="text-sm font-semibold text-pink-700">Versão inicial profissional</p>
        <p className="mt-1 text-sm text-neutral-600">
          Base pronta para crescer com login, banco, cobrança e Vercel.
        </p>
      </div>
    </aside>
  );
}
