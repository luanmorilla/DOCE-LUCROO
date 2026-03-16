 "use client";

import { Pencil, Plus, ReceiptText, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/ui/section-heading";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAppData } from "@/contexts/app-data-context";
import { orderItemTotal } from "@/lib/metrics";
import type {
  DeliveryMethod,
  Order,
  OrderChannel,
  OrderItem,
  OrderStatus
} from "@/lib/types";
import { formatCurrency, generateId, todayISO } from "@/lib/utils";

type OrderForm = {
  customerId: string;
  items: OrderItem[];
  orderDate: string;
  deliveryDate: string;
  deliveryMethod: DeliveryMethod;
  channel: OrderChannel;
  address: string;
  status: OrderStatus;
  notes: string;
  signalPaid: number;
  discount: number;
};

const statusOptions: OrderStatus[] = [
  "Pendente",
  "Confirmada",
  "Em produção",
  "Pronta",
  "Entregue",
  "Cancelada"
];

const channelOptions: OrderChannel[] = ["WhatsApp", "Instagram", "Indicação", "Loja", "Outro"];
const deliveryOptions: DeliveryMethod[] = ["Retirada", "Entrega"];

const emptyForm: OrderForm = {
  customerId: "",
  items: [],
  orderDate: todayISO(),
  deliveryDate: todayISO(),
  deliveryMethod: "Retirada",
  channel: "WhatsApp",
  address: "",
  status: "Pendente",
  notes: "",
  signalPaid: 0,
  discount: 0
};

export function OrdersScreen() {
  const { state, addOrder, updateOrder, deleteOrder } = useAppData();
  const [editing, setEditing] = useState<Order | null>(null);
  const [form, setForm] = useState<OrderForm>(emptyForm);

  const orderTotal = useMemo(() => {
    return form.items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0) - form.discount;
  }, [form.discount, form.items]);

  const balance = Math.max(orderTotal - form.signalPaid, 0);

  const reset = () => {
    setEditing(null);
    setForm(emptyForm);
  };

  const addItem = () => {
    const firstProduct = state.products[0];
    if (!firstProduct) return;
    setForm((current) => ({
      ...current,
      items: [
        ...current.items,
        {
          id: generateId("item"),
          productId: firstProduct.id,
          quantity: 1,
          unitPrice: firstProduct.price
        }
      ]
    }));
  };

  const updateItem = (index: number, field: keyof OrderItem, value: string | number) => {
    setForm((current) => ({
      ...current,
      items: current.items.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeItem = (index: number) => {
    setForm((current) => ({
      ...current,
      items: current.items.filter((_, itemIndex) => itemIndex !== index)
    }));
  };

  const handleProductChange = (index: number, productId: string) => {
    const product = state.products.find((item) => item.id === productId);
    setForm((current) => ({
      ...current,
      items: current.items.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              productId,
              unitPrice: product?.price ?? item.unitPrice
            }
          : item
      )
    }));
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.customerId || !form.items.length) return;

    if (editing) {
      updateOrder({ ...editing, ...form });
    } else {
      addOrder(form);
    }

    reset();
  };

  const startEdit = (order: Order) => {
    setEditing(order);
    setForm({
      customerId: order.customerId,
      items: order.items,
      orderDate: order.orderDate,
      deliveryDate: order.deliveryDate,
      deliveryMethod: order.deliveryMethod,
      channel: order.channel,
      address: order.address,
      status: order.status,
      notes: order.notes,
      signalPaid: order.signalPaid,
      discount: order.discount
    });
  };

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Operação"
        title="Encomendas"
        description="Gerencie pedidos, sinal, saldo e acompanhamento de produção do jeito certo."
      />

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <form className="surface rounded-[28px] p-5 space-y-4" onSubmit={submit}>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">{editing ? "Editar encomenda" : "Nova encomenda"}</h3>
            <Button variant="secondary" className="gap-2" onClick={reset}>
              <Plus className="h-4 w-4" />
              Limpar
            </Button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Cliente</label>
            <Select
              value={form.customerId}
              onChange={(e) => setForm((current) => ({ ...current, customerId: e.target.value }))}
              required
            >
              <option value="">Selecione um cliente</option>
              {state.customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-3 rounded-3xl border border-pink-100 bg-pink-50/60 p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Itens do pedido</p>
              <Button variant="ghost" className="gap-2" onClick={addItem}>
                <Plus className="h-4 w-4" />
                Adicionar item
              </Button>
            </div>

            {form.items.map((item, index) => (
              <div
                key={item.id}
                className="grid gap-3 rounded-3xl bg-white p-3 md:grid-cols-[1fr_0.45fr_0.55fr_auto]"
              >
                <Select value={item.productId} onChange={(e) => handleProductChange(index, e.target.value)}>
                  {state.products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </Select>
                <Input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateItem(index, "quantity", Number(e.target.value))}
                />
                <Input
                  type="number"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(e) => updateItem(index, "unitPrice", Number(e.target.value))}
                />
                <Button variant="danger" className="px-3 py-2" onClick={() => removeItem(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold">Data do pedido</label>
              <Input
                type="date"
                value={form.orderDate}
                onChange={(e) => setForm((current) => ({ ...current, orderDate: e.target.value }))}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Data de entrega</label>
              <Input
                type="date"
                value={form.deliveryDate}
                onChange={(e) => setForm((current) => ({ ...current, deliveryDate: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold">Canal</label>
              <Select
                value={form.channel}
                onChange={(e) =>
                  setForm((current) => ({ ...current, channel: e.target.value as OrderChannel }))
                }
              >
                {channelOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </Select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Entrega</label>
              <Select
                value={form.deliveryMethod}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    deliveryMethod: e.target.value as DeliveryMethod
                  }))
                }
              >
                {deliveryOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </Select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Status</label>
              <Select
                value={form.status}
                onChange={(e) =>
                  setForm((current) => ({ ...current, status: e.target.value as OrderStatus }))
                }
              >
                {statusOptions.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </Select>
            </div>
          </div>

          {form.deliveryMethod === "Entrega" ? (
            <div>
              <label className="mb-2 block text-sm font-semibold">Endereço</label>
              <Input
                value={form.address}
                onChange={(e) => setForm((current) => ({ ...current, address: e.target.value }))}
              />
            </div>
          ) : null}

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold">Sinal pago</label>
              <Input
                type="number"
                step="0.01"
                value={form.signalPaid}
                onChange={(e) =>
                  setForm((current) => ({ ...current, signalPaid: Number(e.target.value) }))
                }
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Desconto</label>
              <Input
                type="number"
                step="0.01"
                value={form.discount}
                onChange={(e) =>
                  setForm((current) => ({ ...current, discount: Number(e.target.value) }))
                }
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Observações</label>
            <Textarea
              value={form.notes}
              onChange={(e) => setForm((current) => ({ ...current, notes: e.target.value }))}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="bg-white/70 p-4">
              <p className="text-sm text-neutral-500">Total</p>
              <p className="mt-2 text-xl font-bold">{formatCurrency(orderTotal)}</p>
            </Card>
            <Card className="bg-white/70 p-4">
              <p className="text-sm text-neutral-500">Sinal</p>
              <p className="mt-2 text-xl font-bold">{formatCurrency(form.signalPaid)}</p>
            </Card>
            <Card className="bg-white/70 p-4">
              <p className="text-sm text-neutral-500">Saldo</p>
              <p className="mt-2 text-xl font-bold">{formatCurrency(balance)}</p>
            </Card>
          </div>

          <Button type="submit" className="w-full">
            {editing ? "Salvar encomenda" : "Cadastrar encomenda"}
          </Button>
        </form>

        <div className="space-y-4">
          {state.orders.length ? (
            state.orders.map((order) => {
              const customer = state.customers.find((item) => item.id === order.customerId);

              return (
                <Card key={order.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-pink-600">Encomenda</p>
                      <h3 className="text-xl font-bold">{customer?.name ?? "Cliente removido"}</h3>
                      <p className="mt-1 text-sm text-neutral-500">
                        {order.deliveryDate} • {order.deliveryMethod} • {order.channel}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" className="px-3 py-2" onClick={() => startEdit(order)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="danger" className="px-3 py-2" onClick={() => deleteOrder(order.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-700">
                      {order.status}
                    </span>
                    <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                      {formatCurrency(orderItemTotal(order))}
                    </span>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Sinal {formatCurrency(order.signalPaid)}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    {order.items.map((item) => {
                      const product = state.products.find((productItem) => productItem.id === item.productId);
                      return (
                        <div key={item.id} className="flex items-center justify-between rounded-2xl border border-pink-100 px-4 py-3 text-sm">
                          <div>
                            <p className="font-medium">{product?.name ?? "Produto removido"}</p>
                            <p className="text-neutral-500">
                              {item.quantity} x {formatCurrency(item.unitPrice)}
                            </p>
                          </div>
                          <p className="font-semibold">{formatCurrency(item.quantity * item.unitPrice)}</p>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              );
            })
          ) : (
            <EmptyState
              icon={ReceiptText}
              title="Nenhuma encomenda cadastrada"
              description="Assim que você criar pedidos, o sistema já calcula total, sinal e saldo restante."
            />
          )}
        </div>
      </div>
    </div>
  );
}
