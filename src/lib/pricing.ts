export type PricingInfo = {
  base_currency: string;
  base_amount: number;
  country: string;
  display_currency: string;
  display_currency_name?: string;
  display_symbol: string;
  display_amount: number;
  formatted: string;
  exchange_rate: number;
  charge_currency: string;
  charge_amount: number;
};

export function formatPricing(pricing?: PricingInfo | null, fallbackUsd?: number | string | null) {
  if (pricing?.formatted) return pricing.formatted;
  const amount = Number(fallbackUsd || 0);
  return `$${Number.isFinite(amount) ? amount : 0}`;
}

export function formatCurrencyAmount(currency: string, amount: number) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    }).format(amount);
  } catch {
    return `${currency} ${Number(amount || 0).toLocaleString()}`;
  }
}

export function pricingFromContext(amountUsd: number, context?: PricingInfo | null): PricingInfo | null {
  if (!context) return null;
  const exchangeRate = Number(context.exchange_rate || 1);
  const displayAmount = Number((Number(amountUsd || 0) * exchangeRate).toFixed(2));

  return {
    ...context,
    base_amount: Number(amountUsd || 0),
    display_amount: displayAmount,
    formatted: formatCurrencyAmount(context.display_currency || "USD", displayAmount),
    charge_amount: Number(amountUsd || 0),
  };
}
