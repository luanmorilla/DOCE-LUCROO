 "use client";

import { Calculator, Pencil, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/ui/section-heading";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAppData } from "@/contexts/app-data-context";
import { recipeTotalCost, recipeUnitCost } from "@/lib/metrics";
import type { Recipe, RecipeIngredient } from "@/lib/types";
import { formatCurrency, generateId } from "@/lib/utils";

type RecipeForm = {
  name: string;
  productId: string;
  yieldAmount: number;
  packagingCost: number;
  laborCost: number;
  extraCost: number;
  notes: string;
  ingredients: RecipeIngredient[];
};

const emptyForm: RecipeForm = {
  name: "",
  productId: "",
  yieldAmount: 1,
  packagingCost: 0,
  laborCost: 0,
  extraCost: 0,
  notes: "",
  ingredients: [{ id: generateId("ing"), name: "", quantity: "", cost: 0 }]
};

export function RecipesScreen() {
  const { state, addRecipe, updateRecipe, deleteRecipe } = useAppData();
  const [editing, setEditing] = useState<Recipe | null>(null);
  const [form, setForm] = useState<RecipeForm>(emptyForm);

  const totalCost = useMemo(
    () =>
      recipeTotalCost({
        id: editing?.id ?? "",
        createdAt: editing?.createdAt ?? "",
        ...form
      }),
    [editing?.createdAt, editing?.id, form]
  );

  const unitCost = useMemo(
    () =>
      recipeUnitCost({
        id: editing?.id ?? "",
        createdAt: editing?.createdAt ?? "",
        ...form
      }),
    [editing?.createdAt, editing?.id, form]
  );

  const reset = () => {
    setEditing(null);
    setForm(emptyForm);
  };

  const updateIngredient = (
    index: number,
    field: keyof RecipeIngredient,
    value: string | number
  ) => {
    setForm((current) => ({
      ...current,
      ingredients: current.ingredients.map((ingredient, ingredientIndex) =>
        ingredientIndex === index ? { ...ingredient, [field]: value } : ingredient
      )
    }));
  };

  const addIngredientRow = () => {
    setForm((current) => ({
      ...current,
      ingredients: [
        ...current.ingredients,
        { id: generateId("ing"), name: "", quantity: "", cost: 0 }
      ]
    }));
  };

  const removeIngredient = (index: number) => {
    setForm((current) => ({
      ...current,
      ingredients: current.ingredients.filter((_, ingredientIndex) => ingredientIndex !== index)
    }));
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      ...form,
      productId: form.productId || undefined,
      ingredients: form.ingredients.filter((item) => item.name.trim())
    };

    if (editing) {
      updateRecipe({ ...editing, ...payload });
    } else {
      addRecipe(payload);
    }

    reset();
  };

  const startEdit = (recipe: Recipe) => {
    setEditing(recipe);
    setForm({
      name: recipe.name,
      productId: recipe.productId ?? "",
      yieldAmount: recipe.yieldAmount,
      packagingCost: recipe.packagingCost,
      laborCost: recipe.laborCost,
      extraCost: recipe.extraCost,
      notes: recipe.notes,
      ingredients: recipe.ingredients
    });
  };

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Precificação"
        title="Receitas e fichas técnicas"
        description="Calcule o custo real dos seus doces com ingredientes, embalagem, mão de obra e gastos extras."
      />

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <form className="surface rounded-[28px] p-5 space-y-4" onSubmit={submit}>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">{editing ? "Editar receita" : "Nova receita"}</h3>
            <Button variant="secondary" onClick={reset}>
              Limpar
            </Button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Nome da ficha</label>
            <Input
              value={form.name}
              onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))}
              placeholder="Ex.: Receita base brownie"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Produto vinculado</label>
            <Select
              value={form.productId}
              onChange={(e) => setForm((current) => ({ ...current, productId: e.target.value }))}
            >
              <option value="">Sem vínculo</option>
              {state.products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold">Rendimento</label>
              <Input
                type="number"
                value={form.yieldAmount}
                onChange={(e) =>
                  setForm((current) => ({ ...current, yieldAmount: Number(e.target.value) }))
                }
                min={1}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Embalagem</label>
              <Input
                type="number"
                step="0.01"
                value={form.packagingCost}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    packagingCost: Number(e.target.value)
                  }))
                }
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold">Mão de obra</label>
              <Input
                type="number"
                step="0.01"
                value={form.laborCost}
                onChange={(e) =>
                  setForm((current) => ({ ...current, laborCost: Number(e.target.value) }))
                }
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Custos extras</label>
              <Input
                type="number"
                step="0.01"
                value={form.extraCost}
                onChange={(e) =>
                  setForm((current) => ({ ...current, extraCost: Number(e.target.value) }))
                }
              />
            </div>
          </div>

          <div className="space-y-3 rounded-3xl border border-pink-100 bg-pink-50/60 p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Ingredientes</p>
              <Button variant="ghost" className="gap-2" onClick={addIngredientRow}>
                <Plus className="h-4 w-4" />
                Adicionar
              </Button>
            </div>

            {form.ingredients.map((ingredient, index) => (
              <div key={ingredient.id} className="grid gap-3 rounded-3xl bg-white p-3 md:grid-cols-[1fr_0.8fr_0.6fr_auto]">
                <Input
                  value={ingredient.name}
                  onChange={(e) => updateIngredient(index, "name", e.target.value)}
                  placeholder="Ingrediente"
                />
                <Input
                  value={ingredient.quantity}
                  onChange={(e) => updateIngredient(index, "quantity", e.target.value)}
                  placeholder="Quantidade"
                />
                <Input
                  type="number"
                  step="0.01"
                  value={ingredient.cost}
                  onChange={(e) => updateIngredient(index, "cost", Number(e.target.value))}
                  placeholder="Custo"
                />
                <Button variant="danger" className="px-3 py-2" onClick={() => removeIngredient(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Observações</label>
            <Textarea
              value={form.notes}
              onChange={(e) => setForm((current) => ({ ...current, notes: e.target.value }))}
              placeholder="Pontos importantes de produção, validade ou montagem."
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="bg-white/70 p-4">
              <p className="text-sm text-neutral-500">Custo total da receita</p>
              <p className="mt-2 text-2xl font-bold">{formatCurrency(totalCost)}</p>
            </Card>
            <Card className="bg-white/70 p-4">
              <p className="text-sm text-neutral-500">Custo por unidade</p>
              <p className="mt-2 text-2xl font-bold">{formatCurrency(unitCost)}</p>
            </Card>
          </div>

          <Button type="submit" className="w-full">
            {editing ? "Salvar receita" : "Cadastrar receita"}
          </Button>
        </form>

        <div className="space-y-4">
          {state.recipes.length ? (
            state.recipes.map((recipe) => (
              <Card key={recipe.id}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-pink-600">Ficha técnica</p>
                    <h3 className="text-xl font-bold">{recipe.name}</h3>
                    <p className="mt-1 text-sm text-neutral-500">
                      Rendimento de {recipe.yieldAmount} unidades
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" className="px-3 py-2" onClick={() => startEdit(recipe)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="danger" className="px-3 py-2" onClick={() => deleteRecipe(recipe.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl bg-pink-50/70 p-4">
                    <p className="text-sm text-neutral-500">Custo total</p>
                    <p className="mt-2 text-lg font-bold">{formatCurrency(recipeTotalCost(recipe))}</p>
                  </div>
                  <div className="rounded-3xl bg-violet-50/70 p-4">
                    <p className="text-sm text-neutral-500">Custo unitário</p>
                    <p className="mt-2 text-lg font-bold">{formatCurrency(recipeUnitCost(recipe))}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="mb-2 text-sm font-semibold">Ingredientes</p>
                  <div className="space-y-2">
                    {recipe.ingredients.map((ingredient) => (
                      <div key={ingredient.id} className="flex items-center justify-between rounded-2xl border border-pink-100 px-4 py-3 text-sm">
                        <div>
                          <p className="font-medium">{ingredient.name}</p>
                          <p className="text-neutral-500">{ingredient.quantity}</p>
                        </div>
                        <p className="font-semibold">{formatCurrency(ingredient.cost)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <EmptyState
              icon={Calculator}
              title="Nenhuma receita cadastrada"
              description="Crie fichas técnicas para precificar seus produtos com mais segurança."
            />
          )}
        </div>
      </div>
    </div>
  );
}
