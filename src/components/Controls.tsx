import type { GamePhase } from '../state/types';

interface ControlsProps {
  phase: GamePhase;
  selectedDayIndex: number | null;
  onStart: () => void;
  onConfirm: () => void;
  onNext: () => void;
}

export function Controls({ phase, selectedDayIndex, onStart, onConfirm, onNext }: ControlsProps) {
  if (phase === 'idle') {
    return (
      <button
        onClick={onStart}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 text-lg cursor-pointer"
      >
        Mulai
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
    return (
      <button
        onClick={onNext}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 text-lg cursor-pointer"
      >
        {phase === 'answered' && selectedDayIndex !== null ? 'Next' : 'Mulai'}
      </button>
    );
  }

  return null;
}
