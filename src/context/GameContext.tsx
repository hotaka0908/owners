import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { GameState, ProductCategory } from '../types/game';
import { createInitialGameState, advanceQuarter, developProduct, enterMarket, executeStoryChoice, switchGameMode, resetGame } from '../game/gameLogic';

interface GameContextType {
  gameState: GameState;
  startNewGame: (companyName: string) => void;
  advanceTime: () => void;
  createProduct: (name: string, category: ProductCategory, investmentLevel: 'low' | 'medium' | 'high') => void;
  expandToMarket: (regionId: string, strategy: 'aggressive' | 'moderate' | 'conservative') => void;
  executeChoice: (choiceId: string, customInput?: string) => void;
  toggleGameMode: () => void;
  restartGame: (companyName: string) => void;
  addCash: (amount: number) => void;
  message: string;
}

type GameAction =
  | { type: 'START_NEW_GAME'; payload: string }
  | { type: 'ADVANCE_QUARTER' }
  | { type: 'DEVELOP_PRODUCT'; payload: { name: string; category: ProductCategory; investmentLevel: 'low' | 'medium' | 'high' } }
  | { type: 'ENTER_MARKET'; payload: { regionId: string; strategy: 'aggressive' | 'moderate' | 'conservative' } }
  | { type: 'EXECUTE_CHOICE'; payload: { choiceId: string; customInput?: string } }
  | { type: 'TOGGLE_GAME_MODE' }
  | { type: 'RESTART_GAME'; payload: string }
  | { type: 'UPDATE_STATE'; payload: GameState }
  | { type: 'SET_MESSAGE'; payload: string }
  | { type: 'ADD_CASH'; payload: number };

interface GameProviderState {
  gameState: GameState;
  message: string;
}

const initialState: GameProviderState = {
  gameState: createInitialGameState('My Company'),
  message: ''
};

const gameReducer = (state: GameProviderState, action: GameAction): GameProviderState => {
  switch (action.type) {
    case 'START_NEW_GAME':
      return {
        ...state,
        gameState: createInitialGameState(action.payload),
        message: `Welcome to ${action.payload}! Your journey to make 10 billion people happy begins now.`
      };
    
    case 'ADVANCE_QUARTER':
      return {
        ...state,
        gameState: advanceQuarter(state.gameState),
        message: `Advanced to Q${state.gameState.currentQuarter === 4 ? 1 : state.gameState.currentQuarter + 1} ${state.gameState.currentQuarter === 4 ? state.gameState.currentYear + 1 : state.gameState.currentYear}`
      };
    
    case 'DEVELOP_PRODUCT':
      const productResult = developProduct(
        state.gameState, 
        action.payload.name, 
        action.payload.category, 
        action.payload.investmentLevel
      );
      return {
        ...state,
        gameState: productResult.newGameState || state.gameState,
        message: productResult.message
      };
    
    case 'ENTER_MARKET':
      const marketResult = enterMarket(
        state.gameState,
        action.payload.regionId,
        action.payload.strategy
      );
      return {
        ...state,
        gameState: marketResult.newGameState || state.gameState,
        message: marketResult.message
      };
    
    case 'EXECUTE_CHOICE':
      const choiceResult = executeStoryChoice(
        state.gameState,
        action.payload.choiceId,
        action.payload.customInput
      );
      return {
        ...state,
        gameState: choiceResult.newGameState,
        message: choiceResult.result?.message || (choiceResult.success ? '選択を実行しました。' : '選択の実行に失敗しました。')
      };
    
    case 'TOGGLE_GAME_MODE':
      const newMode = state.gameState.gameMode === 'dashboard' ? 'story' : 'dashboard';
      return {
        ...state,
        gameState: switchGameMode(state.gameState, newMode),
        message: newMode === 'story' ? 'ストーリーモードに切り替えました。' : 'ダッシュボードモードに切り替えました。'
      };
    
    case 'RESTART_GAME':
      return {
        ...state,
        gameState: resetGame(action.payload),
        message: `${action.payload}で新しいゲームを開始しました！`
      };
    
    case 'UPDATE_STATE':
      return {
        ...state,
        gameState: action.payload
      };
    
    case 'SET_MESSAGE':
      return {
        ...state,
        message: action.payload
      };
    
    case 'ADD_CASH':
      return {
        ...state,
        gameState: {
          ...state.gameState,
          company: {
            ...state.gameState.company,
            cash: state.gameState.company.cash + action.payload
          }
        },
        message: `ミニゲームで$${(action.payload / 1000).toFixed(0)}Kの資金を獲得しました！`
      };
    
    default:
      return state;
  }
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const startNewGame = (companyName: string) => {
    dispatch({ type: 'START_NEW_GAME', payload: companyName });
  };

  const advanceTime = () => {
    dispatch({ type: 'ADVANCE_QUARTER' });
  };

  const createProduct = (name: string, category: ProductCategory, investmentLevel: 'low' | 'medium' | 'high') => {
    dispatch({ type: 'DEVELOP_PRODUCT', payload: { name, category, investmentLevel } });
  };

  const expandToMarket = (regionId: string, strategy: 'aggressive' | 'moderate' | 'conservative') => {
    dispatch({ type: 'ENTER_MARKET', payload: { regionId, strategy } });
  };

  const executeChoice = (choiceId: string, customInput?: string) => {
    dispatch({ type: 'EXECUTE_CHOICE', payload: { choiceId, customInput } });
  };

  const toggleGameMode = () => {
    dispatch({ type: 'TOGGLE_GAME_MODE' });
  };

  const restartGame = (companyName: string) => {
    dispatch({ type: 'RESTART_GAME', payload: companyName });
  };

  const addCash = (amount: number) => {
    dispatch({ type: 'ADD_CASH', payload: amount });
  };

  const value: GameContextType = {
    gameState: state.gameState,
    startNewGame,
    advanceTime,
    createProduct,
    expandToMarket,
    executeChoice,
    toggleGameMode,
    restartGame,
    addCash,
    message: state.message
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};