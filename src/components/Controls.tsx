import type { GamePhase } from '../state/types';
import { TOTAL_QUESTIONS } from '../state/types';

interface ControlsProps {
  phase: GamePhase;
  selectedDayIndex: number | null;
  questionIndex: number;
  onStart: () => void;
  onConfirm: () => void;
  onNext: () => void;
}

export function Controls({ phase, selectedDayIndex, questionIndex, onStart, onConfirm, onNext }: ControlsProps) {
  if (phase === 'idle') {
    return (
      <button
        onClick={onStart}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 text-lg cursor-pointer"
      >
        Mulai Game
      </button>
    );
  }

  if (phase === 'question') {
    return (
      <button
        onClick={onConfirm}
        disabled={selectedDayIndex === null}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 text-lg cursor-pointer"
      >
        Konfirmasi
      </button>
    );
  }

  if (phase === 'answered') {
    const isLastQuestion = questionIndex >= TOTAL_QUESTIONS - 1;
    const buttonText = isLastQuestion ? 'Lihat hasil dan ringkasan' : 'Next';
    
    return (
      <button
        onClick={onNext}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 text-lg cursor-pointer"
      >
        {buttonText}
      </button>
    );
  }

  return null;
}
