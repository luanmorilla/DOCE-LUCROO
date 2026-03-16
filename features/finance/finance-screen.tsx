"use client";

import {
  ArrowDownCircle,
  ArrowUpCircle,
  Pencil,
  Plus,
  Trash2
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/ui/section-heading";
import { Select } from "@/components/ui/select";
import { SmartNumberInput } from "@/components/ui/smart-number-input";
import { useAppData } from "@/contexts/app-data-context";
import { QuickSaleCard } from "@/features/finance/components/quick-sale-card";
import { financeTotals } from "@/lib/metrics";
import type { ExpenseCategory, FinanceEntry, FinanceType } from "@/lib/types";
import { formatCurrency, startOfMonthISO, todayISO } from "@/lib/utils";

const typeOptions: FinanceType[] = ["Entrada", "Saída"];
const categoryOptions: Array<ExpenseCategory | "Vendas" | "Sinal" | "Outros"> = [
  "Vendas",
  "Sinal",
  "Ingredientes",
  "Embalagens",
  "Entrega",
  "Marketing",
  "Equipamentos",
  "Transporte",
  "Outros"
];

const emptyForm = {
  type: "Saída" as FinanceType,
  category: "Ingredientes" as ExpenseCategory | "Vendas" | "Sinal" | "Outros",
  description: "",
  amount: 0,
  date: todayISO()
};

export function FinanceScreen() {
  const { state, addFinance, updateFinance, deleteFinance } = useAppData();
  const [editing, setEditing] = useState<FinanceEntry | null>(null);
  const [form, setForm] = useState(emptyForm);

  const range = useMemo(
    () => financeTotals(state.financeEntries, startOfMonthISO(), todayISO()),
    [state.financeEntries]
  );

  const reset = () => {
    setEditing(null);
    setForm(emptyForm);
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    if (editing) {
      updateFinance({
        ...editing,
        ...form,
        amount: Number(form.amount)
      });
    } else {
      addFinance({
        ...form,
        amount: Number(form.amount)
      });
    }

    reset();
  };

  const startEdit = (entry: FinanceEntry) => {
    setEditing(entry);
    setForm({
      type: entry.type,
      category: entry.category,
      description: entry.description,
      amount: entry.amount,
      date: entry.date
    });
  };

  const rows = state.financeEntries
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((entry) => [
      entry.date,
      <span
        key={`${entry.id}-type`}
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
          entry.type === "Entrada"
            ? "bg-emerald-50 text-emerald-700"
            : "bg-red-50 text-red-700"
        }`}
      >
        {entry.type}
      </span>,
      entry.category,
      entry.description,
      formatCurrency(entry.amount),
      <div key={`${entry.id}-actions`} className="flex gap-2">
        <Button
          type="button"
          variant="ghost"
          className="px-3 py-2"
          onClick={() => startEdit(entry)}
        >
          <Pencil className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="danger"
          className="px-3 py-2"
          onClick={() => deleteFinance(entry.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ]);

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Financeiro"
        title="Caixa e lançamentos"
        description="Controle entradas, saídas, vendas rápidas e acompanhe o saldo do seu negócio."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <div className="surface rounded-[28px] p-5">
          <div className="mb-3 inline-flex rounded-2xl bg-emerald-50 p-3 text-emerald-700">
            <ArrowUpCircle className="h-5 w-5" />
          </div>
          <p className="text-sm text-neutral-500">Entradas do mês</p>
          <p className="mt-2 text-2xl font-bold">{formatCurrency(range.entriesTotal)}</p>
        </div>

        <div className="surface rounded-[28px] p-5">
          <div className="mb-3 inline-flex rounded-2xl bg-red-50 p-3 text-red-700">
            <ArrowDownCircle className="h-5 w-5" />
          </div>
          <p className="text-sm text-neutral-500">Saídas do mês</p>
          <p className="mt-2 text-2xl font-bold">{formatCurrency(range.expensesTotal)}</p>
        </div>

        <div className="surface rounded-[28px] p-5">
          <div className="mb-3 inline-flex rounded-2xl bg-pink-50 p-3 text-pink-700">
            <Plus className="h-5 w-5" />
          </div>
          <p className="text-sm text-neutral-500">Saldo do mês</p>
          <p className="mt-2 text-2xl font-bold">{formatCurrency(range.net)}</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <QuickSaleCard />

        <form className="surface rounded-[28px] p-5 space-y-4" onSubmit={submit}>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">
              {editing ? "Editar lançamento manual" : "Novo lançamento manual"}
            </h3>

            <Button type="button" variant="secondary" className="gap-2" onClick={reset}>
              <Plus className="h-4 w-4" />
              Limpar
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold">Tipo</label>
              <Select
                value={form.type}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    type: e.target.value as FinanceType
                  }))
                }
              >
                {typeOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Categoria</label>
              <Select
                value={form.category}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    category: e.target.value as ExpenseCategory | "Vendas" | "Sinal" | "Outros"
                  }))
                }
              >
                {categoryOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </Select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Descrição</label>
            <Input
              value={form.description}
              onChange={(e) =>
                setForm((current) => ({
                  ...current,
                  description: e.target.value
                }))
              }
              placeholder="Ex.: compra de ingredientes, sinal recebido, taxa de entrega..."
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold">Valor</label>
              <SmartNumberInput
                value={form.amount}
                onValueChange={(value) =>
                  setForm((current) => ({
                    ...current,
                    amount: Number(value)
                  }))
                }
                placeholder="0,00"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Data</label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    date: e.target.value
                  }))
                }
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            {editing ? "Salvar lançamento" : "Cadastrar lançamento"}
          </Button>
        </form>
      </div>

      <DataTable
        headers={["Data", "Tipo", "Categoria", "Descrição", "Valor", "Ações"]}
        rows={rows}
      />
    </div>
  );
}