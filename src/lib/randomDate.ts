/**
 * Generate a random date between 1500 and 2500 (UTC)
 * Uses uniform distribution by day
 */
export function generateRandomDate(): Date {
  const startYear = 1500;
  const endYear = 2500;
  
  // Create start and end timestamps (UTC)
  const startDate = new Date(Date.UTC(startYear, 0, 1, 12, 0, 0, 0)); // Jan 1, 1500 12:00 UTC
  const endDate = new Date(Date.UTC(endYear, 11, 31, 12, 0, 0, 0)); // Dec 31, 2500 12:00 UTC
  
  const startTime = startDate.getTime();
  const endTime = endDate.getTime();
  
  // Generate random timestamp
  const randomTime = startTime + Math.random() * (endTime - startTime);
  
  // Create date and normalize to noon UTC for stability
  const randomDate = new Date(randomTime);
  return new Date(Date.UTC(
    randomDate.getUTCFullYear(),
    randomDate.getUTCMonth(),
    randomDate.getUTCDate(),
    12, 0, 0, 0
  ));
}

/**
 * Check if a year is a leap year
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
