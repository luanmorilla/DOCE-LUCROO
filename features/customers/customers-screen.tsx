 "use client";

import { Pencil, Plus, Trash2, UserRoundSearch } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/ui/section-heading";
import { Textarea } from "@/components/ui/textarea";
import { useAppData } from "@/contexts/app-data-context";
import type { Customer } from "@/lib/types";

const emptyForm = {
  name: "",
  phone: "",
  city: "",
  birthday: "",
  notes: ""
};

export function CustomersScreen() {
  const { state, addCustomer, updateCustomer, deleteCustomer } = useAppData();
  const [editing, setEditing] = useState<Customer | null>(null);
  const [form, setForm] = useState(emptyForm);

  const reset = () => {
    setEditing(null);
    setForm(emptyForm);
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    if (editing) {
      updateCustomer({ ...editing, ...form });
    } else {
      addCustomer(form);
    }

    reset();
  };

  const startEdit = (customer: Customer) => {
    setEditing(customer);
    setForm({
      name: customer.name,
      phone: customer.phone,
      city: customer.city,
      birthday: customer.birthday ?? "",
      notes: customer.notes
    });
  };

  const rows = state.customers.map((customer) => [
    <div key={`${customer.id}-name`}>
      <p className="font-semibold">{customer.name}</p>
      <p className="mt-1 text-xs text-neutral-500">{customer.notes}</p>
    </div>,
    customer.phone,
    customer.city,
    customer.birthday || "-",
    String(state.orders.filter((order) => order.customerId === customer.id).length),
    <div key={`${customer.id}-actions`} className="flex gap-2">
      <Button variant="ghost" className="px-3 py-2" onClick={() => startEdit(customer)}>
        <Pencil className="h-4 w-4" />
      </Button>
      <Button variant="danger" className="px-3 py-2" onClick={() => deleteCustomer(customer.id)}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  ]);

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Relacionamento"
        title="Clientes"
        description="Guarde telefone, cidade, observações e histórico de compras para atender melhor."
      />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <form className="surface rounded-[28px] p-5 space-y-4" onSubmit={submit}>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">{editing ? "Editar cliente" : "Novo cliente"}</h3>
            <Button variant="secondary" className="gap-2" onClick={reset}>
              <Plus className="h-4 w-4" />
              Limpar
            </Button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Nome</label>
            <Input
              value={form.name}
              onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))}
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold">Telefone</label>
              <Input
                value={form.phone}
                onChange={(e) => setForm((current) => ({ ...current, phone: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Cidade</label>
              <Input
                value={form.city}
                onChange={(e) => setForm((current) => ({ ...current, city: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Data de aniversário</label>
            <Input
              type="date"
              value={form.birthday}
              onChange={(e) => setForm((current) => ({ ...current, birthday: e.target.value }))}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Observações</label>
            <Textarea
              value={form.notes}
              onChange={(e) => setForm((current) => ({ ...current, notes: e.target.value }))}
              placeholder="Preferências, horários e observações importantes."
            />
          </div>

          <Button type="submit" className="w-full">
            {editing ? "Salvar cliente" : "Cadastrar cliente"}
          </Button>
        </form>

        <div>
          {state.customers.length ? (
            <DataTable
              headers={["Cliente", "Telefone", "Cidade", "Aniversário", "Encomendas", "Ações"]}
              rows={rows}
            />
          ) : (
            <EmptyState
              icon={UserRoundSearch}
              title="Nenhum cliente cadastrado"
              description="Quando você cadastrar clientes, ficará mais fácil repetir pedidos e organizar atendimento."
            />
          )}
        </div>
      </div>
    </div>
  );
}
