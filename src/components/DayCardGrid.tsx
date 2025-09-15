import type { DayIndex } from '../state/types';
import { DayCard } from './DayCard';

interface DayCardGridProps {
  selectedDayIndex: DayIndex | null;
  correctDayIndex: DayIndex | null;
  isAnswered: boolean;
  isVisible: boolean;
  onSelectDay: (dayIndex: DayIndex) => void;
}

export function DayCardGrid({ selectedDayIndex, correctDayIndex, isAnswered, isVisible, onSelectDay }: DayCardGridProps) {
  const days: DayIndex[] = [0, 1, 2, 3, 4, 5, 6]; // Senin to Minggu

  if (!isVisible) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {days.map((dayIndex) => {
        const isSelected = selectedDayIndex === dayIndex;
        const isCorrect = isAnswered ? (dayIndex === correctDayIndex) : null;
        const isDisabled = isAnswered;

        return (
          <DayCard
            key={dayIndex}
            dayIndex={dayIndex}
            isSelected={isSelected}
            isCorrect={isCorrect}
            isDisabled={isDisabled}
            onClick={onSelectDay}
          />
        );
      })}
    </div>
  );
}
