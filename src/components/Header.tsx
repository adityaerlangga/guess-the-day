import type { GamePhase } from '../state/types';
import { TOTAL_QUESTIONS } from '../state/types';

interface HeaderProps {
  phase: GamePhase;
  questionIndex: number;
}

export function Header({ phase, questionIndex }: HeaderProps) {
  const showProgress = phase === 'question' || phase === 'answered';

  return (
    <header className="text-center mb-8">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
        Guess The Day
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Tebak hari dari tanggal yang diberikan menggunakan Doomsday Technique
      </p>
      
      {showProgress && (
        <div className="mb-4">
          <div className="bg-blue-100 rounded-full px-4 py-2 inline-block">
            <span className="text-blue-800 font-semibold">
              Soal {questionIndex + 1} dari {TOTAL_QUESTIONS}
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
