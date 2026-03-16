 "use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/ui/section-heading";
import { useAppData } from "@/contexts/app-data-context";
import { financeTotals, orderItemTotal } from "@/lib/metrics";
import { formatCurrency, startOfMonthISO, todayISO } from "@/lib/utils";

const COLORS = ["#d94680", "#7c3aed", "#0ea5e9", "#f59e0b", "#059669"];

export function ReportsScreen() {
  const { state } = useAppData();
  const [startDate, setStartDate] = useState(startOfMonthISO());
  const [endDate, setEndDate] = useState(todayISO());

  const filteredOrders = useMemo(
    () =>
      state.orders.filter(
        (order) =>
          order.deliveryDate >= startDate &&
          order.deliveryDate <= endDate &&
          order.status !== "Cancelada"
      ),
    [endDate, startDate, state.orders]
  );

  const filteredFinance = useMemo(
    () => state.financeEntries.filter((entry) => entry.date >= startDate && entry.date <= endDate),
    [endDate, startDate, state.financeEntries]
  );

  const financial = financeTotals(filteredFinance, startDate, endDate);

  const productChart = useMemo(() => {
    const map = new Map<string, number>();

    filteredOrders.forEach((order) => {
      order.items.forEach((item) => {
        const product = state.products.find((productItem) => productItem.id === item.productId);
        const key = product?.name ?? "Produto removido";
        map.set(key, (map.get(key) ?? 0) + item.quantity);
      });
    });

    return Array.from(map.entries()).map(([name, quantity]) => ({
      name,
      quantity
    }));
  }, [filteredOrders, state.products]);

  const expenseChart = useMemo(() => {
    const map = new Map<string, number>();

    filteredFinance
      .filter((entry) => entry.type === "Saída")
      .forEach((entry) => {
        map.set(entry.category, (map.get(entry.category) ?? 0) + entry.amount);
      });

    return Array.from(map.entries()).map(([name, value]) => ({
      name,
      value
    }));
  }, [filteredFinance]);

  const revenueByOrder = filteredOrders.map((order) => ({
    date: order.deliveryDate.slice(5).replace("-", "/"),
    total: orderItemTotal(order)
  }));

  const totalRevenue = filteredOrders.reduce((acc, order) => acc + orderItemTotal(order), 0);

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Inteligência"
        title="Relatórios e gráficos"
        description="Escolha um período e acompanhe faturamento, despesas, produtos mais vendidos e composição dos gastos."
      />

      <Card className="p-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <label className="mb-2 block text-sm font-semibold">Data inicial</label>
            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Data final</label>
            <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <div className="rounded-3xl bg-pink-50/70 p-4">
            <p className="text-sm text-neutral-500">Faturamento</p>
            <p className="mt-2 text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
          </div>
          <div className="rounded-3xl bg-violet-50/70 p-4">
            <p className="text-sm text-neutral-500">Saldo financeiro</p>
            <p className="mt-2 text-2xl font-bold">{formatCurrency(financial.net)}</p>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <p className="text-sm text-neutral-500">Faturamento por encomenda</p>
          <h3 className="mb-5 text-xl font-bold">Receita do período</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueByOrder}>
                <CartesianGrid stroke="#f6d3e4" strokeDasharray="4 4" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Bar dataKey="total" fill="#d94680" radius={[14, 14, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <p className="text-sm text-neutral-500">Produtos campeões</p>
          <h3 className="mb-5 text-xl font-bold">Mais vendidos</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productChart} layout="vertical">
                <CartesianGrid stroke="#f6d3e4" strokeDasharray="4 4" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={160} />
                <Tooltip />
                <Bar dataKey="quantity" fill="#7c3aed" radius={[0, 14, 14, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <p className="text-sm text-neutral-500">Saídas por categoria</p>
          <h3 className="mb-5 text-xl font-bold">Composição dos gastos</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseChart}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={4}
                >
                  {expenseChart.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <p className="text-sm text-neutral-500">Resumo estratégico</p>
          <h3 className="mb-5 text-xl font-bold">Leitura do período</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-pink-50/70 p-4">
              <p className="text-sm text-neutral-500">Total de encomendas</p>
              <p className="mt-2 text-2xl font-bold">{filteredOrders.length}</p>
            </div>
            <div className="rounded-3xl bg-violet-50/70 p-4">
              <p className="text-sm text-neutral-500">Ticket médio</p>
              <p className="mt-2 text-2xl font-bold">
                {formatCurrency(filteredOrders.length ? totalRevenue / filteredOrders.length : 0)}
              </p>
            </div>
            <div className="rounded-3xl bg-emerald-50/70 p-4">
              <p className="text-sm text-neutral-500">Entradas</p>
              <p className="mt-2 text-2xl font-bold">{formatCurrency(financial.entriesTotal)}</p>
            </div>
            <div className="rounded-3xl bg-amber-50/70 p-4">
              <p className="text-sm text-neutral-500">Saídas</p>
              <p className="mt-2 text-2xl font-bold">{formatCurrency(financial.expensesTotal)}</p>
            </div>
          </div>

          <div className="mt-5 rounded-3xl border border-pink-100 bg-white/70 p-5">
            <p className="text-sm leading-7 text-neutral-600">
              {financial.net >= 0
                ? "Seu período está positivo. Agora vale observar quais produtos estão vendendo mais para reforçar produção e margem."
                : "Seu período ficou negativo. Revise precificação, saídas não essenciais e compare o custo dos ingredientes com o preço final de venda."}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
