import { useGame } from './hooks/useGame';
import { Header } from './components/Header';
import { DayCardGrid } from './components/DayCardGrid';
import { Controls } from './components/Controls';
import { ExplanationCard } from './components/ExplanationCard';
import { InfoCard } from './components/InfoCard';
import { Summary } from './components/Summary';
import { Footer } from './components/Footer';
import { formatDateIndonesian } from './lib/dateFormat';

function App() {
  const { gameState, uiState, actions, isNewHighScore } = useGame();

  const renderMainContent = () => {
    if (gameState.phase === 'summary') {
      return (
        <Summary
          history={gameState.history}
          scoreCorrect={gameState.scoreCorrect}
          isNewHighScore={isNewHighScore}
          onRestart={actions.restartGame}
          expandedItems={uiState.expandedItems}
          onToggleItem={actions.toggleSummaryItem}
        />
      );
    }

    return (
      <div className="text-center">
        {gameState.currentDate && (
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {formatDateIndonesian(gameState.currentDate)}
              </h2>
              <p className="text-gray-600">Hari apakah tanggal ini?</p>
            </div>
          </div>
        )}

        <div className="mb-8">
          <DayCardGrid
            selectedDayIndex={gameState.selectedDayIndex}
            correctDayIndex={gameState.correctDayIndex}
            isAnswered={gameState.phase === 'answered'}
            isVisible={gameState.phase !== 'idle'}
            onSelectDay={actions.selectDay}
          />
        </div>

        <div className="mb-8">
          <Controls
            phase={gameState.phase}
            selectedDayIndex={gameState.selectedDayIndex}
            onStart={actions.startGame}
            onConfirm={actions.confirmAnswer}
            onNext={actions.nextQuestion}
          />
        </div>

        {gameState.phase === 'answered' && gameState.history.length > 0 && (
          <div className="mb-8">
            <ExplanationCard
              explanation={gameState.history[gameState.history.length - 1].explanation}
              isOpen={uiState.isExplanationOpen}
              onToggle={actions.toggleExplanation}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto mt-8">
        <Header
          phase={gameState.phase}
          questionIndex={gameState.questionIndex}
        />

{(
        <div className="max-w-6xl mx-auto mt-8">
          <InfoCard
            isOpen={uiState.isInfoOpen}
            section={uiState.infoSection}
            onToggle={actions.toggleInfo}
            onSectionChange={actions.setInfoSection}
          />
        </div>
      )}
        
        <div className="bg-white rounded-xl shadow-xl mt-8 p-8">
          {renderMainContent()}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;
