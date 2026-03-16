"use client";

import { Pencil, Plus, Trash2, PackageSearch } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/ui/section-heading";
import { Select } from "@/components/ui/select";
import { SmartNumberInput } from "@/components/ui/smart-number-input";
import { Textarea } from "@/components/ui/textarea";
import { useAppData } from "@/contexts/app-data-context";
import type { Product, ProductCategory } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

const categories: ProductCategory[] = [
  "Bolos",
  "Doces",
  "Brownies",
  "Brigadeiros",
  "Kits Festa",
  "Sobremesas",
  "Outros"
];

const emptyForm = {
  name: "",
  category: "Bolos" as ProductCategory,
  description: "",
  price: 0,
  estimatedCost: 0,
  active: true
};

export function ProductsScreen() {
  const { state, addProduct, updateProduct, deleteProduct } = useAppData();
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);

  const reset = () => {
    setForm(emptyForm);
    setEditing(null);
  };

  const margin = useMemo(() => {
    const price = Number(form.price || 0);
    const cost = Number(form.estimatedCost || 0);
    if (!price) return 0;
    return ((price - cost) / price) * 100;
  }, [form.estimatedCost, form.price]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    if (editing) {
      updateProduct({
        ...editing,
        ...form,
        price: Number(form.price),
        estimatedCost: Number(form.estimatedCost)
      });
    } else {
      addProduct({
        ...form,
        price: Number(form.price),
        estimatedCost: Number(form.estimatedCost)
      });
    }

    reset();
  };

  const startEdit = (product: Product) => {
    setEditing(product);
    setForm({
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      estimatedCost: product.estimatedCost,
      active: product.active
    });
  };

  const rows = state.products.map((product) => [
    <div key={`${product.id}-name`}>
      <p className="font-semibold">{product.name}</p>
      <p className="mt-1 text-xs text-neutral-500">{product.description}</p>
    </div>,
    product.category,
    formatCurrency(product.price),
    formatCurrency(product.estimatedCost),
    `${(((product.price - product.estimatedCost) / Math.max(product.price, 1)) * 100).toFixed(0)}%`,
    <span
      key={`${product.id}-active`}
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        product.active ? "bg-emerald-50 text-emerald-700" : "bg-neutral-100 text-neutral-600"
      }`}
    >
      {product.active ? "Ativo" : "Inativo"}
    </span>,
    <div key={`${product.id}-actions`} className="flex gap-2">
      <Button type="button" variant="ghost" className="px-3 py-2" onClick={() => startEdit(product)}>
        <Pencil className="h-4 w-4" />
      </Button>
      <Button type="button" variant="danger" className="px-3 py-2" onClick={() => deleteProduct(product.id)}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  ]);

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Catálogo"
        title="Produtos"
        description="Cadastre seus doces e acompanhe preço, custo e margem de cada item."
      />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <form className="surface rounded-[28px] p-5 space-y-4" onSubmit={submit}>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">{editing ? "Editar produto" : "Novo produto"}</h3>
            <Button type="button" variant="secondary" className="gap-2" onClick={reset}>
              <Plus className="h-4 w-4" />
              Limpar
            </Button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Nome</label>
            <Input
              value={form.name}
              onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))}
              placeholder="Ex.: Bolo de pote de ninho"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Categoria</label>
            <Select
              value={form.category}
              onChange={(e) =>
                setForm((current) => ({
                  ...current,
                  category: e.target.value as ProductCategory
                }))
              }
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </Select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Descrição</label>
            <Textarea
              value={form.description}
              onChange={(e) =>
                setForm((current) => ({ ...current, description: e.target.value }))
              }
              placeholder="Descreva ingredientes, tamanho ou observações."
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold">Preço de venda</label>
              <SmartNumberInput
                value={form.price}
                onValueChange={(value) =>
                  setForm((current) => ({ ...current, price: Number(value) }))
                }
                placeholder="0,00"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Custo estimado</label>
              <SmartNumberInput
                value={form.estimatedCost}
                onValueChange={(value) =>
                  setForm((current) => ({
                    ...current,
                    estimatedCost: Number(value)
                  }))
                }
                placeholder="0,00"
                required
              />
            </div>
          </div>

          <div className="rounded-3xl border border-pink-100 bg-pink-50/60 p-4">
            <p className="text-sm text-neutral-500">Margem estimada</p>
            <p className="mt-2 text-2xl font-bold">{margin.toFixed(1)}%</p>
          </div>

          <label className="flex items-center gap-3 rounded-2xl border border-pink-100 bg-white px-4 py-3">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) =>
                setForm((current) => ({ ...current, active: e.target.checked }))
              }
            />
            <span className="text-sm font-medium">Produto ativo para novas encomendas</span>
          </label>

          <Button type="submit" className="w-full">
            {editing ? "Salvar alterações" : "Cadastrar produto"}
          </Button>
        </form>

        <div>
          {state.products.length ? (
            <DataTable
              headers={["Produto", "Categoria", "Preço", "Custo", "Margem", "Status", "Ações"]}
              rows={rows}
            />
          ) : (
            <EmptyState
              icon={PackageSearch}
              title="Nenhum produto cadastrado"
              description="Cadastre seus primeiros doces para começar a montar encomendas e calcular lucro."
            />
          )}
        </div>
      </div>
    </div>
  );
}