import { computed } from "vue";
import { useUserStore } from "@/stores/users.stores";

// Central currency metadata — add new supported currencies here only,
// nowhere else needs to change.
export const CURRENCY_SYMBOLS: Record<string, string> = {
  NGN: "₦",
  USD: "$",
  EUR: "€",
  GBP: "£",
  GHS: "₵",
  KES: "KSh",
  ZAR: "R",
  CAD: "C$",
};

export const CURRENCY_LOCALES: Record<string, string> = {
  NGN: "en-NG",
  USD: "en-US",
  EUR: "de-DE",
  GBP: "en-GB",
  GHS: "en-GH",
  KES: "en-KE",
  ZAR: "en-ZA",
  CAD: "en-CA",
};

export function currencySymbol(code?: string | null): string {
  const c = code || "NGN";
  return CURRENCY_SYMBOLS[c] ?? c;
}

export function currencyLocale(code?: string | null): string {
  const c = code || "NGN";
  return CURRENCY_LOCALES[c] ?? "en-NG";
}

// Formats a number using a specific currency code — use this for records
// that carry their own `currency` field (income, expense, bill, plan,
// rcdata), so historical entries always display in the currency they were
// actually saved in, even if the user later changes their preference.
export function formatCurrency(value: number | null | undefined, code?: string | null): string {
  const num = Number(value ?? 0);
  return `${currencySymbol(code)}${num.toLocaleString(currencyLocale(code))}`;
}

// Reactive helper for contexts with no record yet (new-entry forms, field
// labels) — resolves to the logged-in user's preferred currency.
export function useCurrency() {
  const userStore = useUserStore();
  const currencyCode = computed(() => userStore.user?.preferredCurrency || "NGN");
  const symbol = computed(() => currencySymbol(currencyCode.value));
  const locale = computed(() => currencyLocale(currencyCode.value));

  function format(value: number | null | undefined, code?: string | null) {
    return formatCurrency(value, code ?? currencyCode.value);
  }

  return { currencyCode, symbol, locale, format };
}