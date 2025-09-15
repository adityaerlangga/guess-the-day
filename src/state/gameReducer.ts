import type { GameState, GameAction } from './types';
import { TOTAL_QUESTIONS } from './types';
import { generateRandomDate } from '../lib/randomDate';
import { calculateDayOfWeek, generateExplanation } from '../lib/doomsday';

export const initialState: GameState = {
  phase: 'idle',
  currentDate: null,
  correctDayIndex: null,
  selectedDayIndex: null,
  questionIndex: 0,
  history: [],
  scoreCorrect: 0,
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        phase: 'question',
        questionIndex: 0,
      };

    case 'NEW_QUESTION': {
      const { date, correctDayIndex } = action.payload;
      return {
        ...state,
        phase: 'question',
        currentDate: date,
        correctDayIndex,
        selectedDayIndex: null,
      };
    }

    case 'SELECT_DAY':
      return {
        ...state,
        selectedDayIndex: action.payload,
      };

    case 'CONFIRM_ANSWER': {
      if (!state.currentDate || state.selectedDayIndex === null || state.correctDayIndex === null) {
        return state;
      }

      const isCorrect = state.selectedDayIndex === state.correctDayIndex;
      const explanation = generateExplanation(state.currentDate);
      
      const newHistoryItem = {
        date: state.currentDate,
        correctDayIndex: state.correctDayIndex,
        selectedDayIndex: state.selectedDayIndex,
        isCorrect,
        explanation,
      };

      return {
        ...state,
        phase: 'answered',
        history: [...state.history, newHistoryItem],
        scoreCorrect: state.scoreCorrect + (isCorrect ? 1 : 0),
      };
    }

    case 'NEXT_QUESTION': {
      if (state.questionIndex >= TOTAL_QUESTIONS - 1) {
        return {
          ...state,
          phase: 'summary',
        };
      }

      // Generate new question
      const newDate = generateRandomDate();
      const newCorrectDayIndex = calculateDayOfWeek(newDate);

      return {
        ...state,
        phase: 'question',
        questionIndex: state.questionIndex + 1,
        currentDate: newDate,
        correctDayIndex: newCorrectDayIndex,
        selectedDayIndex: null,
      };
    }

    case 'RESTART_GAME':
      return initialState;

    default:
      return state;
  }
}
