import type { DayIndex, Explanation } from '../state/types';
import { isLeapYear } from './randomDate';

// Anchor days for centuries (0=Senin, 6=Minggu)
const CENTURY_ANCHORS: Record<number, DayIndex> = {
  1500: 2, // Rabu
  1600: 1, // Selasa
  1700: 6, // Minggu
  1800: 4, // Jumat
  1900: 2, // Rabu
  2000: 1, // Selasa
  2100: 6, // Minggu
  2200: 4, // Jumat
  2300: 2, // Rabu
  2400: 1, // Selasa
  2500: 6, // Minggu
};

const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

// Doomsday dates for each month (normal year, leap year)
const DOOMSDAY_DATES: Record<number, { normal: number; leap: number }> = {
  0: { normal: 3, leap: 4 },   // Januari
  1: { normal: 28, leap: 29 }, // Februari
  2: { normal: 14, leap: 14 }, // Maret
  3: { normal: 4, leap: 4 },   // April
  4: { normal: 9, leap: 9 },   // Mei
  5: { normal: 6, leap: 6 },   // Juni
  6: { normal: 11, leap: 11 }, // Juli
  7: { normal: 8, leap: 8 },   // Agustus
  8: { normal: 5, leap: 5 },   // September
  9: { normal: 10, leap: 10 }, // Oktober
  10: { normal: 7, leap: 7 },  // November
  11: { normal: 12, leap: 12 }, // Desember
};

/**
 * Get the century anchor day for a given year
 */
function getCenturyAnchor(year: number): DayIndex {
  const century = Math.floor(year / 100) * 100;
  return CENTURY_ANCHORS[century];
}

/**
 * Calculate the doomsday for a given year
 */
function calculateDoomsday(year: number): DayIndex {
  const anchorCentury = getCenturyAnchor(year);
  const yy = year % 100;
  
  const a = Math.floor(yy / 12);
  const b = yy % 12;
  const c = Math.floor(b / 4);
  const d = a + b + c;
  
  return ((anchorCentury + d) % 7) as DayIndex;
}

/**
 * Get the doomsday date for a given month and year
 */
function getDoomsdayDate(month: number, year: number): number {
  const dates = DOOMSDAY_DATES[month];
  return isLeapYear(year) ? dates.leap : dates.normal;
}

/**
 * Calculate what day of the week a given date falls on using Doomsday technique
 */
export function calculateDayOfWeek(date: Date): DayIndex {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  
  const doomsdayYear = calculateDoomsday(year);
  const doomsdayDate = getDoomsdayDate(month, year);
  
  const offset = (day - doomsdayDate) % 7;
  const finalDay = (doomsdayYear + offset + 7) % 7;
  
  return finalDay as DayIndex;
}

/**
 * Generate a detailed explanation of the Doomsday calculation for a given date
 */
export function generateExplanation(date: Date): Explanation {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  
  const century = Math.floor(year / 100) * 100;
  const anchorCentury = getCenturyAnchor(year);
  const yy = year % 100;
  
  const a = Math.floor(yy / 12);
  const b = yy % 12;
  const c = Math.floor(b / 4);
  const d = a + b + c;
  
  const doomsdayYearIndex = calculateDoomsday(year);
  const monthAnchorDate = getDoomsdayDate(month, year);
  const offset = (day - monthAnchorDate) % 7;
  const finalDayIndex = ((doomsdayYearIndex + offset + 7) % 7) as DayIndex;
  
  return {
    anchorCentury: `${century}-an`,
    anchorCenturyDay: DAYS[anchorCentury],
    year,
    yy,
    a,
    b,
    c,
    d,
    doomsdayYearIndex,
    doomsdayYearDay: DAYS[doomsdayYearIndex],
    month,
    monthAnchorDate,
    targetDate: day,
    offset,
    finalDayIndex,
    finalDay: DAYS[finalDayIndex],
  };
}

/**
 * Get all century anchors for the info modal
 */
export function getCenturyAnchors(): Array<{ century: string; day: string }> {
  return Object.entries(CENTURY_ANCHORS).map(([century, dayIndex]) => ({
    century: `${century}-an`,
    day: DAYS[dayIndex],
  }));
}

/**
 * Get all doomsday dates for the info modal
 */
export function getDoomsdayDates(): Array<{ month: string; normal: number; leap: number }> {
  const MONTHS = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  
  return Object.entries(DOOMSDAY_DATES).map(([monthIndex, dates]) => ({
    month: MONTHS[parseInt(monthIndex)],
    normal: dates.normal,
    leap: dates.leap,
  }));
}
