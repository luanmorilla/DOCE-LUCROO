 "use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode
} from "react";
import type {
  AppState,
  Customer,
  FinanceEntry,
  Order,
  Product,
  Recipe,
  Settings
} from "@/lib/types";
import { initialState } from "@/lib/seed";
import { loadState, saveState } from "@/lib/storage";
import { generateId } from "@/lib/utils";

type Action =
  | { type: "hydrate"; payload: AppState }
  | { type: "add-product"; payload: Product }
  | { type: "update-product"; payload: Product }
  | { type: "delete-product"; payload: string }
  | { type: "add-recipe"; payload: Recipe }
  | { type: "update-recipe"; payload: Recipe }
  | { type: "delete-recipe"; payload: string }
  | { type: "add-customer"; payload: Customer }
  | { type: "update-customer"; payload: Customer }
  | { type: "delete-customer"; payload: string }
  | { type: "add-order"; payload: Order }
  | { type: "update-order"; payload: Order }
  | { type: "delete-order"; payload: string }
  | { type: "add-finance"; payload: FinanceEntry }
  | { type: "update-finance"; payload: FinanceEntry }
  | { type: "delete-finance"; payload: string }
  | { type: "update-settings"; payload: Settings }
  | { type: "reset-data" };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "hydrate":
      return action.payload;
    case "add-product":
      return { ...state, products: [action.payload, ...state.products] };
    case "update-product":
      return {
        ...state,
        products: state.products.map((item) =>
          item.id === action.payload.id ? action.payload : item
        )
      };
    case "delete-product":
      return {
        ...state,
        products: state.products.filter((item) => item.id !== action.payload)
      };
    case "add-recipe":
      return { ...state, recipes: [action.payload, ...state.recipes] };
    case "update-recipe":
      return {
        ...state,
        recipes: state.recipes.map((item) =>
          item.id === action.payload.id ? action.payload : item
        )
      };
    case "delete-recipe":
      return {
        ...state,
        recipes: state.recipes.filter((item) => item.id !== action.payload)
      };
    case "add-customer":
      return { ...state, customers: [action.payload, ...state.customers] };
    case "update-customer":
      return {
        ...state,
        customers: state.customers.map((item) =>
          item.id === action.payload.id ? action.payload : item
        )
      };
    case "delete-customer":
      return {
        ...state,
        customers: state.customers.filter((item) => item.id !== action.payload)
      };
    case "add-order":
      return { ...state, orders: [action.payload, ...state.orders] };
    case "update-order":
      return {
        ...state,
        orders: state.orders.map((item) =>
          item.id === action.payload.id ? action.payload : item
        )
      };
    case "delete-order":
      return {
        ...state,
        orders: state.orders.filter((item) => item.id !== action.payload)
      };
    case "add-finance":
      return { ...state, financeEntries: [action.payload, ...state.financeEntries] };
    case "update-finance":
      return {
        ...state,
        financeEntries: state.financeEntries.map((item) =>
          item.id === action.payload.id ? action.payload : item
        )
      };
    case "delete-finance":
      return {
        ...state,
        financeEntries: state.financeEntries.filter((item) => item.id !== action.payload)
      };
    case "update-settings":
      return { ...state, settings: action.payload };
    case "reset-data":
      return initialState;
    default:
      return state;
  }
}

type ContextValue = {
  state: AppState;
  addProduct: (payload: Omit<Product, "id" | "createdAt">) => void;
  updateProduct: (payload: Product) => void;
  deleteProduct: (id: string) => void;
  addRecipe: (payload: Omit<Recipe, "id" | "createdAt">) => void;
  updateRecipe: (payload: Recipe) => void;
  deleteRecipe: (id: string) => void;
  addCustomer: (payload: Omit<Customer, "id" | "createdAt">) => void;
  updateCustomer: (payload: Customer) => void;
  deleteCustomer: (id: string) => void;
  addOrder: (payload: Omit<Order, "id" | "createdAt">) => void;
  updateOrder: (payload: Order) => void;
  deleteOrder: (id: string) => void;
  addFinance: (payload: Omit<FinanceEntry, "id" | "createdAt">) => void;
  updateFinance: (payload: FinanceEntry) => void;
  deleteFinance: (id: string) => void;
  updateSettings: (payload: Settings) => void;
  resetData: () => void;
};

const AppDataContext = createContext<ContextValue | null>(null);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "hydrate", payload: loadState() });
  }, []);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const value = useMemo<ContextValue>(
    () => ({
      state,
      addProduct: (payload) =>
        dispatch({
          type: "add-product",
          payload: { ...payload, id: generateId("product"), createdAt: new Date().toISOString() }
        }),
      updateProduct: (payload) => dispatch({ type: "update-product", payload }),
      deleteProduct: (id) => dispatch({ type: "delete-product", payload: id }),
      addRecipe: (payload) =>
        dispatch({
          type: "add-recipe",
          payload: { ...payload, id: generateId("recipe"), createdAt: new Date().toISOString() }
        }),
      updateRecipe: (payload) => dispatch({ type: "update-recipe", payload }),
      deleteRecipe: (id) => dispatch({ type: "delete-recipe", payload: id }),
      addCustomer: (payload) =>
        dispatch({
          type: "add-customer",
          payload: { ...payload, id: generateId("customer"), createdAt: new Date().toISOString() }
        }),
      updateCustomer: (payload) => dispatch({ type: "update-customer", payload }),
      deleteCustomer: (id) => dispatch({ type: "delete-customer", payload: id }),
      addOrder: (payload) =>
        dispatch({
          type: "add-order",
          payload: { ...payload, id: generateId("order"), createdAt: new Date().toISOString() }
        }),
      updateOrder: (payload) => dispatch({ type: "update-order", payload }),
      deleteOrder: (id) => dispatch({ type: "delete-order", payload: id }),
      addFinance: (payload) =>
        dispatch({
          type: "add-finance",
          payload: { ...payload, id: generateId("finance"), createdAt: new Date().toISOString() }
        }),
      updateFinance: (payload) => dispatch({ type: "update-finance", payload }),
      deleteFinance: (id) => dispatch({ type: "delete-finance", payload: id }),
      updateSettings: (payload) => dispatch({ type: "update-settings", payload }),
      resetData: () => dispatch({ type: "reset-data" })
    }),
    [state]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) throw new Error("useAppData must be used inside AppDataProvider");
  return context;
}
