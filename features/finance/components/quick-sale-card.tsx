"use client";

import { ShoppingCart, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { SmartNumberInput } from "@/components/ui/smart-number-input";
import { useAppData } from "@/contexts/app-data-context";
import { formatCurrency, todayISO } from "@/lib/utils";

type QuickSaleCardProps = {
  compact?: boolean;
};

export function QuickSaleCard({ compact = false }: QuickSaleCardProps) {
  const { state, addFinance } = useAppData();

  const firstActiveProduct = state.products.find((product) => product.active) ?? state.products[0];

  const [form, setForm] = useState({
    productId: firstActiveProduct?.id ?? "",
    quantity: 1,
    unitPrice: firstActiveProduct?.price ?? 0,
    discount: 0,
    date: todayISO(),
    description: ""
  });

  const selectedProduct = state.products.find((product) => product.id === form.productId);

  const total = useMemo(() => {
    const value = form.quantity * form.unitPrice - form.discount;
    return Math.max(value, 0);
  }, [form.quantity, form.unitPrice, form.discount]);

  const resetForm = () => {
    const firstProduct = state.products.find((product) => product.active) ?? state.products[0];

    setForm({
      productId: firstProduct?.id ?? "",
      quantity: 1,
      unitPrice: firstProduct?.price ?? 0,
      discount: 0,
      date: todayISO(),
      description: ""
    });
  };

  const handleProductChange = (productId: string) => {
    const product = state.products.find((item) => item.id === productId);

    setForm((current) => ({
      ...current,
      productId,
      unitPrice: product?.price ?? 0
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.productId || total <= 0) return;

    addFinance({
      type: "Entrada",
      category: "Vendas",
      description:
        form.description.trim() ||
        `Venda rápida • ${selectedProduct?.name ?? "Produto"} x${form.quantity}`,
      amount: total,
      date: form.date
    });

    resetForm();
  };

  if (!state.products.length) {
    return (
      <div className="rounded-[28px] border border-dashed border-pink-200 bg-white/80 p-5">
        <div className="mb-3 inline-flex rounded-2xl bg-pink-50 p-3 text-pink-600">
          <ShoppingCart className="h-5 w-5" />
        </div>

        <h3 className="text-xl font-bold">Venda rápida</h3>
        <p className="mt-2 text-sm text-neutral-500">
          Antes de registrar uma venda, cadastre pelo menos um produto na aba
          <span className="font-semibold text-neutral-700"> Produtos</span>.
        </p>
      </div>
    );
  }

  return (
    <form className="surface rounded-[28px] p-5 space-y-4" onSubmit={handleSubmit}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-pink-600">Ação rápida</p>
          <h3 className="text-xl font-bold">Registrar venda</h3>
          <p className="mt-1 text-sm text-neutral-500">
            Ideal para vender no balcão ou lançar uma entrada na hora.
          </p>
        </div>

        <div className="rounded-2xl bg-pink-50 p-3 text-pink-600">
          <Sparkles className="h-5 w-5" />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">Produto</label>
        <Select
          value={form.productId}
          onChange={(e) => handleProductChange(e.target.value)}
          required
        >
          <option value="">Selecione um produto</option>
          {state.products
            .filter((product) => product.active)
            .map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
        </Select>
      </div>

      <div className={`grid gap-4 ${compact ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
        <div>
          <label className="mb-2 block text-sm font-semibold">Quantidade</label>
          <SmartNumberInput
            value={form.quantity}
            onValueChange={(value) =>
              setForm((current) => ({
                ...current,
                quantity: Math.max(1, Math.trunc(value || 0))
              }))
            }
            decimals={0}
            placeholder="1"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">Valor unitário</label>
          <SmartNumberInput
            value={form.unitPrice}
            onValueChange={(value) =>
              setForm((current) => ({
                ...current,
                unitPrice: Number(value)
              }))
            }
            placeholder="0,00"
          />
        </div>

        {!compact && (
          <div>
            <label className="mb-2 block text-sm font-semibold">Desconto</label>
            <SmartNumberInput
              value={form.discount}
              onValueChange={(value) =>
                setForm((current) => ({
                  ...current,
                  discount: Number(value)
                }))
              }
              placeholder="0,00"
            />
          </div>
        )}
      </div>

      {compact && (
        <div>
          <label className="mb-2 block text-sm font-semibold">Desconto</label>
          <SmartNumberInput
            value={form.discount}
            onValueChange={(value) =>
              setForm((current) => ({
                ...current,
                discount: Number(value)
              }))
            }
            placeholder="0,00"
          />
        </div>
      )}

      <div className={`grid gap-4 ${compact ? "md:grid-cols-1" : "md:grid-cols-2"}`}>
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

        {!compact && (
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
              placeholder="Ex.: venda no balcão"
            />
          </div>
        )}
      </div>

      {compact && (
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
            placeholder="Ex.: venda no balcão"
          />
        </div>
      )}

      <div className="rounded-3xl border border-pink-100 bg-pink-50/60 p-4">
        <p className="text-sm text-neutral-500">Total da venda</p>
        <p className="mt-2 text-2xl font-bold">{formatCurrency(total)}</p>
      </div>

      <div className="flex gap-3">
        <Button type="submit" className="flex-1">
          Registrar venda
        </Button>

        <Button type="button" variant="secondary" onClick={resetForm}>
          Limpar
        </Button>
      </div>
    </form>
  );
}