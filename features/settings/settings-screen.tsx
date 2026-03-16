 "use client";

import { RotateCcw, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/ui/section-heading";
import { useAppData } from "@/contexts/app-data-context";
import type { Settings } from "@/lib/types";

export function SettingsScreen() {
  const { state, updateSettings, resetData } = useAppData();
  const [form, setForm] = useState<Settings>(state.settings);

  useEffect(() => {
    setForm(state.settings);
  }, [state.settings]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    updateSettings(form);
  };

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Configuração"
        title="Ajustes do negócio"
        description="Personalize nome do negócio, WhatsApp, cidade e custos padrão para manter tudo organizado."
      />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <form className="surface rounded-[28px] p-5 space-y-4" onSubmit={submit}>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold">Nome do negócio</label>
              <Input
                value={form.businessName}
                onChange={(e) =>
                  setForm((current) => ({ ...current, businessName: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Nome da responsável</label>
              <Input
                value={form.ownerName}
                onChange={(e) =>
                  setForm((current) => ({ ...current, ownerName: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold">WhatsApp</label>
              <Input
                value={form.whatsapp}
                onChange={(e) =>
                  setForm((current) => ({ ...current, whatsapp: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Cidade</label>
              <Input
                value={form.city}
                onChange={(e) =>
                  setForm((current) => ({ ...current, city: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold">Mão de obra padrão</label>
              <Input
                type="number"
                step="0.01"
                value={form.defaultLaborCost}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    defaultLaborCost: Number(e.target.value)
                  }))
                }
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Custos extras padrão</label>
              <Input
                type="number"
                step="0.01"
                value={form.defaultExtraCost}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    defaultExtraCost: Number(e.target.value)
                  }))
                }
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Embalagem padrão</label>
              <Input
                type="number"
                step="0.01"
                value={form.defaultPackagingCost}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    defaultPackagingCost: Number(e.target.value)
                  }))
                }
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Taxa de entrega padrão</label>
            <Input
              type="number"
              step="0.01"
              value={form.deliveryFeeDefault}
              onChange={(e) =>
                setForm((current) => ({
                  ...current,
                  deliveryFeeDefault: Number(e.target.value)
                }))
              }
            />
          </div>

          <Button type="submit" className="w-full gap-2">
            <Save className="h-4 w-4" />
            Salvar configurações
          </Button>
        </form>

        <div className="space-y-4">
          <Card>
            <p className="text-sm text-neutral-500">Estrutura pensada para manutenção</p>
            <h3 className="mt-2 text-xl font-bold">Projeto bem separado</h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-600">
              <li>• cada tela fica em `features/`</li>
              <li>• layout fica em `components/layout/`</li>
              <li>• componentes reutilizáveis ficam em `components/ui/`</li>
              <li>• tipos e cálculos ficam em `lib/`</li>
              <li>• o estado global fica em `contexts/`</li>
            </ul>
          </Card>

          <Card className="border border-red-100 bg-red-50/60">
            <p className="text-sm text-red-600">Atenção</p>
            <h3 className="mt-2 text-xl font-bold text-red-800">Resetar todos os dados</h3>
            <p className="mt-3 text-sm text-red-700">
              Isso apaga produtos, clientes, encomendas, receitas e o caixa salvo no navegador.
            </p>
            <Button variant="danger" className="mt-4 gap-2" onClick={resetData}>
              <RotateCcw className="h-4 w-4" />
              Resetar sistema
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
