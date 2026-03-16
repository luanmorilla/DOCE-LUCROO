import type { AppState } from "@/lib/types";
import { todayISO } from "@/lib/utils";

const today = todayISO();

export const initialState: AppState = {
  settings: {
    businessName: "Doce Lucro",
    ownerName: "Sua doceira",
    whatsapp: "(11) 99999-9999",
    city: "São Paulo - SP",
    defaultLaborCost: 8,
    defaultExtraCost: 3,
    defaultPackagingCost: 2.5,
    deliveryFeeDefault: 10
  },
  products: [
    {
      id: "product_bolo_pote",
      name: "Bolo no pote de ninho com morango",
      category: "Sobremesas",
      description: "Bolo gelado em pote de 250ml com recheio de ninho e morango.",
      price: 14,
      estimatedCost: 6.2,
      active: true,
      createdAt: today
    },
    {
      id: "product_brownie",
      name: "Brownie recheado",
      category: "Brownies",
      description: "Brownie com casquinha fina e recheio cremoso.",
      price: 10,
      estimatedCost: 4.15,
      active: true,
      createdAt: today
    },
    {
      id: "product_brigadeiro",
      name: "Caixa com 20 brigadeiros gourmet",
      category: "Brigadeiros",
      description: "Brigadeiros enrolados com granulado belga.",
      price: 45,
      estimatedCost: 20.8,
      active: true,
      createdAt: today
    }
  ],
  recipes: [
    {
      id: "recipe_bolo_pote",
      name: "Receita base bolo no pote",
      productId: "product_bolo_pote",
      yieldAmount: 12,
      packagingCost: 2.5,
      laborCost: 8,
      extraCost: 3,
      notes: "Receita com rendimento médio de 12 unidades.",
      createdAt: today,
      ingredients: [
        { id: "ing_1", name: "Leite condensado", quantity: "2 latas", cost: 16 },
        { id: "ing_2", name: "Creme de leite", quantity: "2 caixas", cost: 8.5 },
        { id: "ing_3", name: "Leite em pó", quantity: "300g", cost: 10.9 },
        { id: "ing_4", name: "Morangos", quantity: "2 bandejas", cost: 14 }
      ]
    },
    {
      id: "recipe_brownie",
      name: "Receita base brownie",
      productId: "product_brownie",
      yieldAmount: 16,
      packagingCost: 1.2,
      laborCost: 7,
      extraCost: 2,
      notes: "Casquinha fina e centro úmido.",
      createdAt: today,
      ingredients: [
        { id: "ing_5", name: "Chocolate meio amargo", quantity: "500g", cost: 16 },
        { id: "ing_6", name: "Manteiga", quantity: "250g", cost: 9.5 },
        { id: "ing_7", name: "Açúcar", quantity: "300g", cost: 2.2 },
        { id: "ing_8", name: "Ovos", quantity: "6 unidades", cost: 6 }
      ]
    }
  ],
  customers: [
    {
      id: "customer_ana",
      name: "Ana Carolina",
      phone: "(11) 99811-2233",
      city: "Santo André - SP",
      notes: "Cliente fiel, prefere retirada no fim da tarde.",
      birthday: "",
      createdAt: today
    },
    {
      id: "customer_bruna",
      name: "Bruna Lima",
      phone: "(11) 98766-4455",
      city: "São Bernardo - SP",
      notes: "Normalmente encomenda kits festa.",
      birthday: "",
      createdAt: today
    }
  ],
  orders: [
    {
      id: "order_1",
      customerId: "customer_ana",
      orderDate: today,
      deliveryDate: today,
      deliveryMethod: "Retirada",
      channel: "WhatsApp",
      address: "",
      status: "Confirmada",
      notes: "Retirar às 18h.",
      signalPaid: 20,
      discount: 0,
      createdAt: today,
      items: [
        {
          id: "item_1",
          productId: "product_bolo_pote",
          quantity: 6,
          unitPrice: 14
        }
      ]
    },
    {
      id: "order_2",
      customerId: "customer_bruna",
      orderDate: today,
      deliveryDate: today,
      deliveryMethod: "Entrega",
      channel: "Instagram",
      address: "Rua das Flores, 123",
      status: "Em produção",
      notes: "Entregar até 15h.",
      signalPaid: 30,
      discount: 5,
      createdAt: today,
      items: [
        {
          id: "item_2",
          productId: "product_brigadeiro",
          quantity: 2,
          unitPrice: 45
        },
        {
          id: "item_3",
          productId: "product_brownie",
          quantity: 8,
          unitPrice: 10
        }
      ]
    }
  ],
  financeEntries: [
    {
      id: "fin_1",
      type: "Entrada",
      category: "Sinal",
      description: "Sinal da encomenda Bruna",
      amount: 30,
      date: today,
      createdAt: today
    },
    {
      id: "fin_2",
      type: "Saída",
      category: "Ingredientes",
      description: "Compra de chocolate e leite condensado",
      amount: 68.4,
      date: today,
      createdAt: today
    },
    {
      id: "fin_3",
      type: "Saída",
      category: "Embalagens",
      description: "Potes e caixas",
      amount: 22.5,
      date: today,
      createdAt: today
    }
  ]
};
