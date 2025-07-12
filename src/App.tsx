import React from 'react';
import { GameProvider } from './context/GameContext';
import Dashboard from './components/Dashboard';
import StoryMode from './components/StoryMode';
import GameSetup from './components/GameSetup';
import { useGame } from './context/GameContext';

const GameContent: React.FC = () => {
  const { gameState } = useGame();
  
  if (!gameState.company.name || gameState.company.name === 'My Company') {
    return <GameSetup />;
  }
  
  if (gameState.gameMode === 'story') {
    return <StoryMode />;
  }
  
  return <Dashboard />;
};

function App() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-slate-50">
        <GameContent />
      </div>
    </GameProvider>
  );
}

export default App;