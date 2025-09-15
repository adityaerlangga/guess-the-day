import type { Explanation } from '../state/types';
import { formatDateIndonesian } from '../lib/dateFormat';

interface ExplanationCardProps {
  explanation: Explanation;
  isOpen: boolean;
  onToggle: () => void;
}

export function ExplanationCard({ explanation, isOpen, onToggle }: ExplanationCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <button
        onClick={onToggle}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 rounded-xl"
        aria-expanded={isOpen}
        aria-controls="explanation-content"
      >
        <h3 className="text-lg font-semibold text-gray-800">
          Pembahasan (Doomsday Technique)
        </h3>
        <svg
          className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div id="explanation-content" className="px-6 pb-6">
          <div className="space-y-4 text-sm text-gray-700">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Langkah 1: Anchor Day Abad</h4>
              <p>Tahun {explanation.anchorCentury}: <strong>{explanation.anchorCenturyDay}</strong></p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Langkah 2: Hitung Doomsday Tahun</h4>
              <p>Tahun {explanation.year} → dua digit terakhir: {explanation.yy}</p>
              <div className="mt-2 space-y-1">
                <p>• a = floor({explanation.yy}/12) = {explanation.a}</p>
                <p>• b = {explanation.yy} % 12 = {explanation.b}</p>
                <p>• c = floor({explanation.b}/4) = {explanation.c}</p>
                <p>• d = {explanation.a} + {explanation.b} + {explanation.c} = {explanation.d}</p>
                <p>• Doomsday tahun = ({explanation.anchorCenturyDay} + {explanation.d}) mod 7 = <strong>{explanation.doomsdayYearDay}</strong></p>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Langkah 3: Tanggal Doomsday Bulan</h4>
              <p>Tanggal Doomsday untuk bulan ini: <strong>{explanation.monthAnchorDate}</strong></p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Langkah 4: Hitung Selisih</h4>
              <p>Tanggal target: {explanation.targetDate}</p>
              <p>Selisih: {explanation.targetDate} - {explanation.monthAnchorDate} = {explanation.offset}</p>
              <p>Hari = ({explanation.doomsdayYearDay} + {explanation.offset}) mod 7 = <strong>{explanation.finalDay}</strong></p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
              <p className="font-semibold text-gray-800">
                Jadi, {formatDateIndonesian(new Date(explanation.year, explanation.month, explanation.targetDate))} adalah hari <strong>{explanation.finalDay}</strong>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
