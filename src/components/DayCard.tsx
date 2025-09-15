import type { DayIndex } from '../state/types';
import { DAYS } from '../state/types';

interface DayCardProps {
  dayIndex: DayIndex;
  isSelected: boolean;
  isCorrect: boolean | null; // null = not answered yet, true = correct, false = incorrect
  isDisabled: boolean;
  onClick: (dayIndex: DayIndex) => void;
}

export function DayCard({ dayIndex, isSelected, isCorrect, isDisabled, onClick }: DayCardProps) {
  const dayName = DAYS[dayIndex];
  
  const getCardClasses = () => {
    let baseClasses = "rounded-xl p-6 text-center cursor-pointer transition-all duration-200 font-semibold text-lg";
    
    if (isDisabled) {
      if (isCorrect === true) {
        return `${baseClasses} bg-green-50 border-2 border-green-500 text-green-800 shadow-lg`;
      } else if (isCorrect === false) {
        return `${baseClasses} bg-red-50 border-2 border-red-500 text-red-800 shadow-lg`;
      }
      return `${baseClasses} bg-gray-100 border-2 border-gray-300 text-gray-500 cursor-not-allowed`;
    }
    
    if (isSelected) {
      return `${baseClasses} bg-blue-50 border-2 border-blue-500 text-blue-800 shadow-lg hover:shadow-xl`;
    }
    
    return `${baseClasses} bg-white border-2 border-gray-200 text-gray-800 hover:border-blue-300 hover:shadow-lg`;
  };

  const handleClick = () => {
    if (!isDisabled) {
      onClick(dayIndex);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={getCardClasses()}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={isDisabled ? -1 : 0}
      role="button"
      aria-pressed={isSelected}
      aria-disabled={isDisabled}
    >
      {dayName}
    </div>
  );
}
