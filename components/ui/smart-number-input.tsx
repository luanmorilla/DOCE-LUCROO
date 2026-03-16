"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type SmartNumberInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "type"
> & {
  value: number;
  onValueChange: (value: number) => void;
  decimals?: number;
};

function toDisplay(value: number, decimals: number) {
  if (!Number.isFinite(value) || value === 0) return "";
  if (decimals === 0) return String(Math.trunc(value));
  return String(value);
}

export function SmartNumberInput({
  value,
  onValueChange,
  decimals = 2,
  className,
  ...props
}: SmartNumberInputProps) {
  const [draft, setDraft] = useState(() => toDisplay(value, decimals));
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) {
      setDraft(toDisplay(value, decimals));
    }
  }, [value, decimals, focused]);

  const pattern = useMemo(() => {
    if (decimals === 0) return /^\d*$/;
    return new RegExp(`^\\d*(?:[\\.,]\\d{0,${decimals}})?$`);
  }, [decimals]);

  const parseValue = (raw: string) => {
    const normalized = raw.replace(",", ".");
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  return (
    <input
      {...props}
      type="text"
      inputMode={decimals === 0 ? "numeric" : "decimal"}
      value={draft}
      onFocus={(event) => {
        setFocused(true);
        if (draft === "0" || draft === "0,00" || draft === "0.00") {
          setDraft("");
        }
        props.onFocus?.(event);
      }}
      onBlur={(event) => {
        setFocused(false);

        if (!draft.trim()) {
          onValueChange(0);
          setDraft("");
        } else {
          const next = parseValue(draft);
          onValueChange(next);
          setDraft(toDisplay(next, decimals));
        }

        props.onBlur?.(event);
      }}
      onChange={(event) => {
        const next = event.target.value;

        if (next === "") {
          setDraft("");
          onValueChange(0);
          return;
        }

        if (!pattern.test(next)) return;

        setDraft(next);
        onValueChange(parseValue(next));
      }}
      className={cn(
        "w-full rounded-2xl border border-pink-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-500/10",
        className
      )}
    />
  );
}