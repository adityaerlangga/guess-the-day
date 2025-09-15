import { MONTHS } from '../state/types';

/**
 * Format a date to Indonesian format: "DD MMMM YYYY"
 */
export function formatDateIndonesian(date: Date): string {
  const day = date.getUTCDate();
  const month = MONTHS[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  
  return `${day} ${month} ${year}`;
}
