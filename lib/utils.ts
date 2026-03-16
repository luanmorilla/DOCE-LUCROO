export const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

export const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric"
});

export function formatCurrency(value: number) {
  return currency.format(Number.isFinite(value) ? value : 0);
}

export function formatDate(value: string) {
  if (!value) return "-";
  return dateFormatter.format(new Date(`${value}T00:00:00`));
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function generateId(prefix: string) {
  return `${prefix}_${crypto.randomUUID().replaceAll("-", "").slice(0, 10)}`;
}

export function todayISO() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

export function sum(values: number[]) {
  return values.reduce((acc, item) => acc + item, 0);
}

export function startOfMonthISO() {
  const now = new Date();
  const local = new Date(now.getFullYear(), now.getMonth(), 1);
  return local.toISOString().slice(0, 10);
}

export function isBetween(date: string, start: string, end: string) {
  return date >= start && date <= end;
}
