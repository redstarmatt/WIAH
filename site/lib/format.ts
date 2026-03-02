/**
 * Format a number with commas as thousands separator.
 */
export function formatNumber(value: number, decimals = 0): string {
  return value.toLocaleString('en-GB', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Format a value with its unit (e.g. "21.3 days", "67%").
 */
export function formatMetric(value: number, unit: string, decimals = 1): string {
  if (unit === '%') return `${formatNumber(value, decimals)}%`;
  if (unit === 'x') return `${formatNumber(value, decimals)}x`;
  return `${formatNumber(value, decimals)} ${unit}`;
}

/**
 * Format a date string (YYYY-MM) to a human-readable form.
 */
export function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  if (!month) return year;
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}

/**
 * Format a signed change value (e.g. "+4.2", "−1.3").
 */
export function formatChange(value: number, decimals = 1): string {
  const prefix = value > 0 ? '+' : value < 0 ? '−' : '';
  return `${prefix}${formatNumber(Math.abs(value), decimals)}`;
}
