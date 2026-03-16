import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export function StatCard({
  label,
  value,
  detail,
  icon: Icon,
  tone = "pink"
}: {
  label: string;
  value: string;
  detail?: string;
  icon: LucideIcon;
  tone?: "pink" | "violet" | "emerald" | "amber";
}) {
  const tones = {
    pink: "from-pink-500/15 to-pink-500/5 text-pink-700",
    violet: "from-violet-500/15 to-violet-500/5 text-violet-700",
    emerald: "from-emerald-500/15 to-emerald-500/5 text-emerald-700",
    amber: "from-amber-500/15 to-amber-500/5 text-amber-700"
  };

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-neutral-500">{label}</p>
          <p className="mt-2 text-2xl font-bold">{value}</p>
          {detail ? <p className="mt-2 text-sm text-neutral-500">{detail}</p> : null}
        </div>
        <div className={`rounded-2xl bg-gradient-to-br p-3 ${tones[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}
