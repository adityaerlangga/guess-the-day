const HIGH_SCORE_KEY = 'guess-the-day-high-score';

/**
 * Get the high score from localStorage
 */
export function getHighScore(): number {
  try {
    const stored = localStorage.getItem(HIGH_SCORE_KEY);
    return stored ? parseInt(stored, 10) : 0;
  } catch {
    return 0;
  }
}

/**
 * Set the high score in localStorage
 */
export function setHighScore(score: number): void {
  try {
    localStorage.setItem(HIGH_SCORE_KEY, score.toString());
  } catch {
    // Ignore storage errors
  }
}

/**
 * Update high score if the new score is higher
 */
export function updateHighScore(newScore: number): boolean {
  const currentHighScore = getHighScore();
  if (newScore > currentHighScore) {
    setHighScore(newScore);
    return true;
  }
  return false;
}
