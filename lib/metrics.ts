import type { AppState, FinanceEntry, Order, Product, Recipe } from "@/lib/types";
import { isBetween, startOfMonthISO, sum, todayISO } from "@/lib/utils";

export function orderItemTotal(order: Order) {
  return sum(order.items.map((item) => item.quantity * item.unitPrice)) - order.discount;
}

export function recipeTotalCost(recipe: Recipe) {
  return (
    sum(recipe.ingredients.map((item) => item.cost)) +
    recipe.packagingCost +
    recipe.laborCost +
    recipe.extraCost
  );
}

export function recipeUnitCost(recipe: Recipe) {
  const total = recipeTotalCost(recipe);
  return recipe.yieldAmount > 0 ? total / recipe.yieldAmount : 0;
}

export function getProductCost(product: Product, recipes: Recipe[]) {
  const recipe = recipes.find((item) => item.productId === product.id);
  return recipe ? recipeUnitCost(recipe) : product.estimatedCost;
}

export function financeTotals(entries: FinanceEntry[], start: string, end: string) {
  const filtered = entries.filter((item) => isBetween(item.date, start, end));
  const entriesTotal = sum(
    filtered.filter((item) => item.type === "Entrada").map((item) => item.amount)
  );
  const expensesTotal = sum(
    filtered.filter((item) => item.type === "Saída").map((item) => item.amount)
  );

  return {
    entriesTotal,
    expensesTotal,
    net: entriesTotal - expensesTotal
  };
}

export function dashboardMetrics(state: AppState) {
  const today = todayISO();
  const monthStart = startOfMonthISO();

  const todayOrders = state.orders.filter((item) => item.deliveryDate === today);
  const monthOrders = state.orders.filter((item) =>
    isBetween(item.deliveryDate, monthStart, today)
  );

  const todayRevenue = sum(
    todayOrders
      .filter((item) => item.status !== "Cancelada")
      .map((item) => orderItemTotal(item))
  );

  const monthRevenue = sum(
    monthOrders
      .filter((item) => item.status !== "Cancelada")
      .map((item) => orderItemTotal(item))
  );

  const monthExpenses = sum(
    state.financeEntries
      .filter((entry) => entry.type === "Saída" && isBetween(entry.date, monthStart, today))
      .map((item) => item.amount)
  );

  const monthProfitEstimate = monthRevenue - monthExpenses;

  const upcomingCount = state.orders.filter(
    (item) =>
      item.status !== "Entregue" &&
      item.status !== "Cancelada" &&
      item.deliveryDate >= today
  ).length;

  return {
    todayRevenue,
    monthRevenue,
    monthExpenses,
    monthProfitEstimate,
    upcomingCount,
    productsCount: state.products.length,
    customersCount: state.customers.length
  };
}
