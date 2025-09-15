import { useReducer, useState, useCallback } from 'react';
import { gameReducer, initialState } from '../state/gameReducer';
import type { UIState, DayIndex } from '../state/types';
import { generateRandomDate } from '../lib/randomDate';
import { calculateDayOfWeek } from '../lib/doomsday';
import { updateHighScore } from '../lib/storage';

export function useGame() {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);
  const [uiState, setUIState] = useState<UIState>({
    isExplanationOpen: false,
    isInfoOpen: false,
    infoSection: 'tahun',
    expandedItems: new Set(),
  });

  const startGame = useCallback(() => {
    dispatch({ type: 'START_GAME' });
    // Generate first question
    const date = generateRandomDate();
    const correctDayIndex = calculateDayOfWeek(date);
    dispatch({ type: 'NEW_QUESTION', payload: { date, correctDayIndex } });
  }, []);

  const selectDay = useCallback((dayIndex: DayIndex) => {
    if (gameState.phase === 'question') {
      dispatch({ type: 'SELECT_DAY', payload: dayIndex });
    }
  }, [gameState.phase]);

  const confirmAnswer = useCallback(() => {
    if (gameState.phase === 'question' && gameState.selectedDayIndex !== null) {
      dispatch({ type: 'CONFIRM_ANSWER' });
    }
  }, [gameState.phase, gameState.selectedDayIndex]);

  const nextQuestion = useCallback(() => {
    if (gameState.phase === 'answered') {
      dispatch({ type: 'NEXT_QUESTION' });
      setUIState(prev => ({ ...prev, isExplanationOpen: false }));
    }
  }, [gameState.phase]);

  const restartGame = useCallback(() => {
    dispatch({ type: 'RESTART_GAME' });
    setUIState({
      isExplanationOpen: false,
      isInfoOpen: false,
      infoSection: 'tahun',
      expandedItems: new Set(),
    });
  }, []);

  const toggleExplanation = useCallback(() => {
    setUIState(prev => ({ ...prev, isExplanationOpen: !prev.isExplanationOpen }));
  }, []);

  const toggleInfo = useCallback(() => {
    setUIState(prev => ({ ...prev, isInfoOpen: !prev.isInfoOpen }));
  }, []);

  const setInfoSection = useCallback((section: 'tahun' | 'tanggal') => {
    setUIState(prev => ({ ...prev, infoSection: section }));
  }, []);

  const toggleSummaryItem = useCallback((index: number) => {
    setUIState(prev => {
      const newExpandedItems = new Set(prev.expandedItems);
      if (newExpandedItems.has(index)) {
        newExpandedItems.delete(index);
      } else {
        newExpandedItems.add(index);
      }
      return { ...prev, expandedItems: newExpandedItems };
    });
  }, []);

  // Update high score when game ends
  const finalScore = gameState.phase === 'summary' ? gameState.scoreCorrect : 0;
  const isNewHighScore = finalScore > 0 && updateHighScore(finalScore);

  return {
    gameState,
    uiState,
    actions: {
      startGame,
      selectDay,
      confirmAnswer,
      nextQuestion,
      restartGame,
      toggleExplanation,
      toggleInfo,
      setInfoSection,
      toggleSummaryItem,
    },
    isNewHighScore,
  };
}
