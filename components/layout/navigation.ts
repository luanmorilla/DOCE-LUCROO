import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookOpenText,
  Boxes,
  LayoutDashboard,
  ReceiptText,
  Settings,
  Users
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const navigation: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Produtos", href: "/products", icon: Boxes },
  { label: "Receitas", href: "/recipes", icon: BookOpenText },
  { label: "Clientes", href: "/customers", icon: Users },
  { label: "Encomendas", href: "/orders", icon: ReceiptText },
  { label: "Caixa", href: "/finance", icon: BarChart3 },
  { label: "Ajustes", href: "/settings", icon: Settings }
];
