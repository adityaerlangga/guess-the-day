import type { QuestionHistory } from '../state/types';
import { TOTAL_QUESTIONS, DAYS } from '../state/types';
import { formatDateIndonesian } from '../lib/dateFormat';
import { ExplanationCard } from './ExplanationCard';

interface SummaryProps {
  history: QuestionHistory[];
  scoreCorrect: number;
  isNewHighScore: boolean;
  onRestart: () => void;
  expandedItems: Set<number>;
  onToggleItem: (index: number) => void;
}

export function Summary({ 
  history, 
  scoreCorrect, 
  isNewHighScore, 
  onRestart, 
  expandedItems, 
  onToggleItem 
}: SummaryProps) {
  const accuracy = Math.round((scoreCorrect / TOTAL_QUESTIONS) * 100);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Hasil Kuis</h2>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">{scoreCorrect}</div>
              <div className="text-gray-600">Benar</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600">{TOTAL_QUESTIONS - scoreCorrect}</div>
              <div className="text-gray-600">Salah</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">{accuracy}%</div>
              <div className="text-gray-600">Akurasi</div>
            </div>
          </div>
          
          {isNewHighScore && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
              <p className="text-yellow-800 font-semibold">🎉 Skor Tertinggi Baru!</p>
            </div>
          )}
        </div>
        
        <button
          onClick={onRestart}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 text-lg cursor-pointer"
        >
          Main Lagi
        </button>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Pembahasan Semua Soal</h3>
        
        {history.map((item, index) => {
          const isExpanded = expandedItems.has(index);
          const isCorrect = item.isCorrect;
          
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200">
              <button
                onClick={() => onToggleItem(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 rounded-xl cursor-pointer"
                aria-expanded={isExpanded}
                aria-controls={`summary-item-${index}`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    isCorrect ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">
                      {formatDateIndonesian(item.date)}
                    </div>
                    <div className="text-sm text-gray-600">
                      Jawaban: {item.isCorrect ? '✅ Benar' : '❌ Salah'} 
                      {` (${item.explanation.finalDay}), Anda memilih ${DAYS[item.selectedDayIndex]}`}
                    </div>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isExpanded && (
                <div id={`summary-item-${index}`} className="px-6 pb-6">
                  <ExplanationCard
                    explanation={item.explanation}
                    isOpen={true}
                    onToggle={() => {}} // Always open in summary
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
