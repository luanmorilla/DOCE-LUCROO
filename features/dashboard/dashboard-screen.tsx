"use client";

import {
  CalendarClock,
  CircleDollarSign,
  HandCoins,
  ShoppingBag,
  Users2
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis
} from "recharts";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatCard } from "@/components/ui/stat-card";
import { useAppData } from "@/contexts/app-data-context";
import { QuickSaleCard } from "@/features/finance/components/quick-sale-card";
import { dashboardMetrics, orderItemTotal } from "@/lib/metrics";
import { formatCurrency } from "@/lib/utils";

export function DashboardScreen() {
  const { state } = useAppData();
  const metrics = dashboardMetrics(state);

  const monthlyChart = state.orders
    .slice()
    .sort((a, b) => a.deliveryDate.localeCompare(b.deliveryDate))
    .slice(0, 10)
    .map((order) => ({
      date: order.deliveryDate.slice(5).replace("-", "/"),
      valor: order.status === "Cancelada" ? 0 : orderItemTotal(order)
    }));

  const upcomingOrders = state.orders
    .filter((item) => item.status !== "Entregue" && item.status !== "Cancelada")
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Visão geral"
        title="Painel principal"
        description="Aqui você acompanha faturamento, lucro estimado, encomendas futuras e a saúde financeira do seu negócio."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard
          label="Faturamento hoje"
          value={formatCurrency(metrics.todayRevenue)}
          detail="Pedidos com entrega para hoje"
          icon={CircleDollarSign}
        />
        <StatCard
          label="Faturamento do mês"
          value={formatCurrency(metrics.monthRevenue)}
          detail="Receita total prevista"
          icon={ShoppingBag}
          tone="violet"
        />
        <StatCard
          label="Despesas do mês"
          value={formatCurrency(metrics.monthExpenses)}
          detail="Saídas registradas"
          icon={HandCoins}
          tone="amber"
        />
        <StatCard
          label="Lucro estimado"
          value={formatCurrency(metrics.monthProfitEstimate)}
          detail="Receita menos saídas"
          icon={CircleDollarSign}
          tone="emerald"
        />
        <StatCard
          label="Encomendas abertas"
          value={String(metrics.upcomingCount)}
          detail={`${metrics.customersCount} clientes cadastrados`}
          icon={Users2}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <QuickSaleCard compact />

        <Card>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-500">Produção</p>
              <h3 className="text-xl font-bold">Próximas encomendas</h3>
            </div>
            <CalendarClock className="h-5 w-5 text-pink-500" />
          </div>

          <div className="space-y-3">
            {upcomingOrders.length ? (
              upcomingOrders.map((order) => {
                const customer = state.customers.find((item) => item.id === order.customerId);

                return (
                  <div
                    key={order.id}
                    className="rounded-3xl border border-pink-100 bg-pink-50/60 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold">{customer?.name ?? "Cliente removido"}</p>
                        <p className="mt-1 text-sm text-neutral-500">
                          Entrega em {order.deliveryDate} • {order.deliveryMethod}
                        </p>
                      </div>

                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-pink-700">
                        {order.status}
                      </span>
                    </div>

                    <p className="mt-3 text-sm font-semibold text-neutral-800">
                      {formatCurrency(orderItemTotal(order))}
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="rounded-3xl border border-dashed border-pink-200 bg-white/80 p-5 text-sm text-neutral-500">
                Nenhuma encomenda em aberto no momento.
              </div>
            )}
          </div>
        </Card>
      </div>

      <Card>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-neutral-500">Receita prevista recente</p>
            <h3 className="text-xl font-bold">Evolução das últimas encomendas</h3>
          </div>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyChart}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d94680" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#d94680" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="#f6d3e4" strokeDasharray="4 4" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />

              <Area
                type="monotone"
                dataKey="valor"
                stroke="#d94680"
                fill="url(#colorRevenue)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}