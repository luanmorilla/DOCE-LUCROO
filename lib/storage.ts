import type { AppState } from "@/lib/types";
import { initialState } from "@/lib/seed";

export const STORAGE_KEY = "doce-lucro:v1";

export function loadState(): AppState {
  if (typeof window === "undefined") return initialState;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState));
      return initialState;
    }

    const parsed = JSON.parse(raw) as AppState;

    return {
      ...initialState,
      ...parsed
    };
  } catch {
    return initialState;
  }
}

export function saveState(state: AppState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
