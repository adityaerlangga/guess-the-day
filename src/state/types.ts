export type GamePhase = 'idle' | 'question' | 'answered' | 'summary';

export type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0=Senin, 6=Minggu

export const TOTAL_QUESTIONS = 3;

export interface Explanation {
  anchorCentury: string;
  anchorCenturyDay: string;
  year: number;
  yy: number;
  a: number;
  b: number;
  c: number;
  d: number;
  doomsdayYearIndex: DayIndex;
  doomsdayYearDay: string;
  month: number;
  monthAnchorDate: number;
  targetDate: number;
  offset: number;
  finalDayIndex: DayIndex;
  finalDay: string;
}

export interface QuestionHistory {
  date: Date;
  correctDayIndex: DayIndex;
  selectedDayIndex: DayIndex;
  isCorrect: boolean;
  explanation: Explanation;
}

export interface GameState {
  phase: GamePhase;
  currentDate: Date | null;
  correctDayIndex: DayIndex | null;
  selectedDayIndex: DayIndex | null;
  questionIndex: number; // 0-9
  history: QuestionHistory[];
  scoreCorrect: number;
}

export interface UIState {
  isExplanationOpen: boolean;
  isInfoOpen: boolean;
  infoSection: 'tahun' | 'tanggal';
  expandedItems: Set<number>; // For summary page
}

export type GameAction =
  | { type: 'START_GAME' }
  | { type: 'NEW_QUESTION'; payload: { date: Date; correctDayIndex: DayIndex } }
  | { type: 'SELECT_DAY'; payload: DayIndex }
  | { type: 'CONFIRM_ANSWER' }
  | { type: 'NEXT_QUESTION' }
  | { type: 'RESTART_GAME' };

export const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'] as const;

export const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
] as const;
