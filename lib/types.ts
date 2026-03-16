export type ProductCategory =
  | "Bolos"
  | "Doces"
  | "Brownies"
  | "Brigadeiros"
  | "Kits Festa"
  | "Sobremesas"
  | "Outros";

export type OrderStatus =
  | "Pendente"
  | "Confirmada"
  | "Em produção"
  | "Pronta"
  | "Entregue"
  | "Cancelada";

export type OrderChannel = "WhatsApp" | "Instagram" | "Indicação" | "Loja" | "Outro";

export type DeliveryMethod = "Retirada" | "Entrega";

export type FinanceType = "Entrada" | "Saída";

export type ExpenseCategory =
  | "Ingredientes"
  | "Embalagens"
  | "Entrega"
  | "Marketing"
  | "Equipamentos"
  | "Transporte"
  | "Outros";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  estimatedCost: number;
  active: boolean;
  createdAt: string;
};

export type RecipeIngredient = {
  id: string;
  name: string;
  quantity: string;
  cost: number;
};

export type Recipe = {
  id: string;
  name: string;
  productId?: string;
  yieldAmount: number;
  packagingCost: number;
  laborCost: number;
  extraCost: number;
  ingredients: RecipeIngredient[];
  notes: string;
  createdAt: string;
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  city: string;
  birthday?: string;
  notes: string;
  createdAt: string;
};

export type OrderItem = {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
};

export type Order = {
  id: string;
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
  createdAt: string;
};

export type FinanceEntry = {
  id: string;
  type: FinanceType;
  category: ExpenseCategory | "Vendas" | "Sinal" | "Outros";
  description: string;
  amount: number;
  date: string;
  createdAt: string;
};

export type Settings = {
  businessName: string;
  ownerName: string;
  whatsapp: string;
  city: string;
  defaultLaborCost: number;
  defaultExtraCost: number;
  defaultPackagingCost: number;
  deliveryFeeDefault: number;
};

export type AppState = {
  products: Product[];
  recipes: Recipe[];
  customers: Customer[];
  orders: Order[];
  financeEntries: FinanceEntry[];
  settings: Settings;
};
