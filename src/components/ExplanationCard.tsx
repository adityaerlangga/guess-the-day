import type { Explanation } from '../state/types';
import { formatDateIndonesian } from '../lib/dateFormat';

// Helper function to show day progression
function getDayProgression(startDay: string, steps: number): string {
  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  const startIndex = days.indexOf(startDay);
  
  if (startIndex === -1) return startDay;
  
  const progression = [];
  let currentIndex = startIndex;
  
  progression.push(days[currentIndex]);
  
  for (let i = 1; i <= steps; i++) {
    currentIndex = (currentIndex + 1) % 7;
    progression.push(`${days[currentIndex]} (+${i})`);
  }
  
  return progression.join(' → ');
}

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
              <p>Tahun {explanation.year} → dua digit terakhir: <strong>{explanation.yy}</strong></p>
              <div className="flex justify-center">
                <div className="mt-2 space-y-1 pl-4 text-left max-w-lg w-full">
                  <div className="flex justify-between items-center">
                    <span>• a = {explanation.yy} / 12 = {(explanation.yy/12).toFixed(2)} {`=>`} <strong>{explanation.a}</strong></span>
                    <span className="text-gray-500 text-xs">(pembulatan ke bawah)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>• b = {explanation.yy} mod 12 = <strong>{explanation.b}</strong></span>
                    <span className="text-gray-500 text-xs">(modulo atau sisa pembagian)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>• c = floor(b/4) {`=>`} floor({explanation.b}/4) = {(explanation.b/4).toFixed(2)} {`=>`} <strong>{explanation.c}</strong></span>
                    <span className="text-gray-500 text-xs">(pembulatan ke bawah)</span>
                  </div>
                  <p>• d = {explanation.a} + {explanation.b} + {explanation.c} = <strong>{explanation.d}</strong></p>
                  {/* <p>• Doomsday tahun = ({explanation.anchorCenturyDay} + {explanation.d}) mod 7 = <strong>{explanation.doomsdayYearDay}</strong></p> */}
                  <p>
                    • Doomsday tahun = {explanation.d} mod 7 = <strong>{explanation.d % 7}</strong>
                  </p>
                  <p>
                    • Mulai dari anchor day <strong>{explanation.anchorCenturyDay}</strong>, tambah {explanation.d % 7} hari:
                  </p>
                  <p className="ml-4 text-blue-700 font-medium">
                    {getDayProgression(explanation.anchorCenturyDay, explanation.d % 7)}
                  </p>
                  <p>
                    • Jadi doomsday tahun {explanation.year} adalah <strong>{explanation.doomsdayYearDay}</strong>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Langkah 3: Tanggal Doomsday Bulan</h4>
              <p>
                Tanggal Doomsday untuk bulan {new Date(0, explanation.month).toLocaleString('id-ID', { month: 'long' })} adalah <strong>{explanation.monthAnchorDate} {new Date(0, explanation.month).toLocaleString('id-ID', { month: 'long' })}</strong>
              </p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Langkah 4: Hitung Selisih</h4>
              <div className="flex justify-center">
                <div className="mt-2 space-y-1 pl-4 text-left max-w-lg w-full">
                  <p>• Tanggal target: <strong>{explanation.targetDate} {new Date(0, explanation.month).toLocaleString('id-ID', { month: 'long' })}</strong></p>
                  <p>• Selisih: {explanation.targetDate} - {explanation.monthAnchorDate} = <strong>{explanation.targetDate - explanation.monthAnchorDate}</strong></p>
                  <p>• Sisa pembagian: {explanation.targetDate - explanation.monthAnchorDate} mod 7 = <strong>{explanation.offset}</strong></p>
                  <p>
                    • Mulai dari doomsday tahun <strong>{explanation.doomsdayYearDay}</strong>, tambah {explanation.offset} hari:
                  </p>
                  <p className="ml-4 text-purple-700 font-medium">
                    {getDayProgression(explanation.doomsdayYearDay, explanation.offset)}
                  </p>
                  <p>
                    • Jadi hari yang dicari adalah <strong>{explanation.finalDay}</strong>
                  </p>
                </div>
              </div>
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
