import { getCenturyAnchors, getDoomsdayDates } from '../lib/doomsday';

interface InfoCardProps {
  isOpen: boolean;
  section: 'tahun' | 'tanggal';
  onToggle: () => void;
  onSectionChange: (section: 'tahun' | 'tanggal') => void;
}

export function InfoCard({ isOpen, section, onToggle, onSectionChange }: InfoCardProps) {
  const centuryAnchors = getCenturyAnchors();
  const doomsdayDates = getDoomsdayDates();

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <button
        onClick={onToggle}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 rounded-xl cursor-pointer"
        aria-expanded={isOpen}
        aria-controls="info-content"
      >
        <h3 className="text-lg font-semibold text-gray-800">
          ℹ️ Info Doomsday
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
        <div id="info-content" className="p-6 border-t border-gray-200">
          <div className="flex mb-4 space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onSectionChange('tahun')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer ${
                section === 'tahun'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Doomsday Abad
            </button>
            <button
              onClick={() => onSectionChange('tanggal')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer ${
                section === 'tanggal'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Tanggal Doomsday
            </button>
          </div>
          
          {section === 'tahun' && (
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Anchor Day per Abad</h4>
              <div className="space-y-2">
                {centuryAnchors.map(({ century, day }) => (
                  <div key={century} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-800">Tahun {century}</span>
                    <span className="text-blue-600 font-semibold">{day}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {section === 'tanggal' && (
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Tanggal Doomsday per Bulan</h4>
              <div className="space-y-2">
                {doomsdayDates.map(({ month, normal, leap }) => (
                  <div key={month} className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-800 mb-1">{normal === leap ? (
                        <span>{normal} {month}</span>
                      ) : (
                        <span>{normal} {month} atau {leap} {month} di tahun kabisat</span>
                      )}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
