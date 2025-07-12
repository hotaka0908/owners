import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import GameResults from './GameResults';
import MiniGame from './MiniGame';
import type { ActionChoice } from '../types/game';

const StoryMode: React.FC = () => {
  const { gameState, executeChoice, toggleGameMode, message, addCash } = useGame();
  const [selectedChoice, setSelectedChoice] = useState<string>('');
  const [customInput, setCustomInput] = useState<string>('');
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);
  const [lastExecutedTurn, setLastExecutedTurn] = useState<number>(0);
  const [showResultMessage, setShowResultMessage] = useState<boolean>(false);
  const [showMiniGame, setShowMiniGame] = useState<boolean>(false);
  const [miniGameDifficulty, setMiniGameDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  // Check if game is complete - either by flag or 20 turns reached
  const isGameComplete = gameState.storyProgress.isGameComplete || 
                        gameState.storyProgress.totalTurns >= 20 || 
                        gameState.currentTurn.turnNumber > 20;
  
  if (isGameComplete) {
    return <GameResults />;
  }

  // Reset selection when turn changes
  useEffect(() => {
    if (gameState.currentTurn.turnNumber !== lastExecutedTurn) {
      setSelectedChoice('');
      setShowCustomInput(false);
      setCustomInput('');
      setShowResultMessage(false);
      // Update lastExecutedTurn to prevent repeated resets
      setLastExecutedTurn(gameState.currentTurn.turnNumber);
    }
  }, [gameState.currentTurn.turnNumber, lastExecutedTurn]);

  // Show result message briefly then hide, but only if we're still on the same turn
  useEffect(() => {
    if (showResultMessage && message && gameState.currentTurn.turnNumber === lastExecutedTurn) {
      const timer = setTimeout(() => {
        setShowResultMessage(false);
      }, 1500); // Show for 1.5 seconds then hide
      
      return () => clearTimeout(timer);
    }
  }, [showResultMessage, message, gameState.currentTurn.turnNumber, lastExecutedTurn]);

  const formatCurrency = (amount: number): string => {
    if (amount >= 1e12) return `$${(amount / 1e12).toFixed(1)}兆`;
    if (amount >= 1e9) return `$${(amount / 1e9).toFixed(1)}B`;
    if (amount >= 1e6) return `$${(amount / 1e6).toFixed(1)}M`;
    if (amount >= 1e3) return `$${(amount / 1e3).toFixed(1)}K`;
    return `$${amount.toFixed(0)}`;
  };

  const formatNumber = (num: number): string => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(1)}億人`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}万人`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}千人`;
    return `${num}人`;
  };

  const totalHappyPeople = gameState.regions.reduce((sum, region) => 
    sum + (region.population * region.happinessLevel / 100), 0
  );

  const handleChoiceSelection = (choiceId: string) => {
    if (choiceId === 'custom') {
      setShowCustomInput(true);
      setSelectedChoice('custom');
    } else {
      setSelectedChoice(choiceId);
      setShowCustomInput(false);
    }
  };

  const handleExecuteChoice = () => {
    // Record the current turn to track when it changes
    setLastExecutedTurn(gameState.currentTurn.turnNumber);
    setShowResultMessage(true);
    
    if (selectedChoice === 'custom') {
      if (customInput.trim()) {
        executeChoice('custom-action', customInput.trim());
      }
    } else {
      executeChoice(selectedChoice);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '簡単';
      case 'medium': return '普通';
      case 'hard': return '困難';
      default: return '不明';
    }
  };

  const canAffordChoice = (choice: ActionChoice): boolean => {
    const { company } = gameState;
    const required = choice.requiredResources || {};
    
    return (
      (!required.cash || company.cash >= required.cash) &&
      (!required.employees || company.employees >= required.employees) &&
      (!required.researchPoints || gameState.researchPoints >= required.researchPoints) &&
      (!required.reputation || company.reputation >= required.reputation)
    );
  };

  const handleMiniGameStart = (difficulty: 'easy' | 'medium' | 'hard') => {
    setMiniGameDifficulty(difficulty);
    setShowMiniGame(true);
  };

  const handleMiniGameSuccess = (earnedAmount: number) => {
    addCash(earnedAmount);
    setShowMiniGame(false);
  };

  const handleMiniGameClose = () => {
    setShowMiniGame(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header */}
      <header className="bg-black bg-opacity-50 backdrop-blur-sm border-b border-white border-opacity-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-6">
              <h1 className="text-xl font-bold text-white">{gameState.company.name}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-300">
                <div>時価総額: <span className="text-green-400 font-semibold">{formatCurrency(gameState.company.marketCap)}</span></div>
                <div>幸せな人々: <span className="text-blue-400 font-semibold">{formatNumber(totalHappyPeople)}</span></div>
                <div>資金: <span className="text-yellow-400 font-semibold">{formatCurrency(gameState.company.cash)}</span></div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">
                ターン {gameState.currentTurn.turnNumber}/20
              </span>
              <div className="bg-gray-700 rounded-full px-3 py-1">
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(gameState.currentTurn.turnNumber / 20) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-300">
                    {Math.round((gameState.currentTurn.turnNumber / 20) * 100)}%
                  </span>
                </div>
              </div>
              <button
                onClick={toggleGameMode}
                className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                ダッシュボード
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Message Bar - only show when result message is active */}
      {showResultMessage && message && (
        <div className="bg-green-900 bg-opacity-70 border-l-4 border-green-400 p-4 transition-all duration-300">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <div className="animate-pulse w-3 h-3 bg-green-400 rounded-full mr-3"></div>
              <p className="text-green-200 font-medium">{message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Situation */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">現在の状況</h2>
          <p className="text-gray-200 text-lg leading-relaxed">
            {gameState.currentTurn.currentSituation}
          </p>
          
          {/* Progress Info */}
          <div className="mt-4 flex items-center space-x-6 text-sm text-gray-300">
            <div>総ターン数: {gameState.storyProgress.totalTurns}</div>
            <div>完了アクション: {gameState.storyProgress.completedActions.length}</div>
            <div>従業員: {gameState.company.employees}人</div>
            <div>研究ポイント: {gameState.researchPoints}pt</div>
          </div>
        </div>

        {/* Choices */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white">次の行動を選択してください</h3>
          
          {/* AI Generated Choices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gameState.currentTurn.availableChoices.map((choice) => {
              const canAfford = canAffordChoice(choice);
              const isSelected = selectedChoice === choice.id;
              
              return (
                <button
                  key={choice.id}
                  onClick={() => handleChoiceSelection(choice.id)}
                  disabled={!canAfford || showResultMessage}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    showResultMessage
                      ? 'border-gray-700 bg-gray-900 bg-opacity-30 opacity-30 cursor-not-allowed'
                      : isSelected
                      ? 'border-blue-400 bg-blue-900 bg-opacity-70 ring-2 ring-blue-300'
                      : canAfford
                      ? 'border-gray-600 bg-gray-800 bg-opacity-50 hover:border-gray-500 hover:bg-opacity-70 hover:scale-102'
                      : 'border-gray-700 bg-gray-900 bg-opacity-30 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-white">{choice.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(choice.difficulty)} bg-opacity-20`}>
                      {getDifficultyText(choice.difficulty)}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-3">{choice.description}</p>
                  
                  {/* Requirements */}
                  {choice.requiredResources && (
                    <div className="text-xs text-gray-400 space-y-1">
                      <div className="font-medium">必要リソース:</div>
                      {choice.requiredResources.cash && (
                        <div className={gameState.company.cash >= choice.requiredResources.cash ? 'text-green-400' : 'text-red-400'}>
                          資金: {formatCurrency(choice.requiredResources.cash)}
                        </div>
                      )}
                      {choice.requiredResources.employees && (
                        <div className={gameState.company.employees >= choice.requiredResources.employees ? 'text-green-400' : 'text-red-400'}>
                          従業員: {choice.requiredResources.employees}人
                        </div>
                      )}
                      {choice.requiredResources.researchPoints && (
                        <div className={gameState.researchPoints >= choice.requiredResources.researchPoints ? 'text-green-400' : 'text-red-400'}>
                          研究ポイント: {choice.requiredResources.researchPoints}pt
                        </div>
                      )}
                      {choice.requiredResources.reputation && (
                        <div className={gameState.company.reputation >= choice.requiredResources.reputation ? 'text-green-400' : 'text-red-400'}>
                          企業イメージ: {choice.requiredResources.reputation}
                        </div>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Custom Choice */}
          <div className="bg-gradient-to-r from-purple-800 to-pink-800 bg-opacity-50 rounded-lg p-6">
            <h4 className="text-white font-semibold mb-3">💡 あなた独自のアイデア</h4>
            <p className="text-gray-200 text-sm mb-4">
              既存の選択肢にとらわれず、あなた自身のアイデアで会社を成長させましょう。
              どんな戦略でも可能です！
            </p>
            
            <div className="space-y-3">
              <button
                onClick={() => handleChoiceSelection('custom')}
                disabled={showResultMessage}
                className={`w-full p-3 rounded border-2 text-left transition-all ${
                  showResultMessage
                    ? 'border-gray-700 bg-gray-900 bg-opacity-30 opacity-30 cursor-not-allowed'
                    : selectedChoice === 'custom'
                    ? 'border-pink-400 bg-pink-900 bg-opacity-70 ring-2 ring-pink-300'
                    : 'border-gray-600 bg-gray-800 bg-opacity-50 hover:border-gray-500 hover:scale-102'
                }`}
              >
                <span className="text-white font-medium">カスタム戦略を実行する</span>
              </button>
              
              {showCustomInput && !showResultMessage && (
                <div className="space-y-3">
                  <textarea
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="あなたのアイデアを詳しく説明してください...（例：AIを活用した教育プラットフォームを開発し、世界中の子供たちに無料で提供する）"
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 transition-all"
                    rows={3}
                    disabled={showResultMessage}
                  />
                  <div className="text-xs text-gray-400">
                    必要リソース: 資金 $300K、従業員 15人、研究ポイント 5pt
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Execute Button */}
          {selectedChoice && !showResultMessage && (
            <div className="flex justify-center">
              <button
                onClick={handleExecuteChoice}
                disabled={selectedChoice === 'custom' && !customInput.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105 active:scale-95"
              >
                {selectedChoice === 'custom' ? 'カスタム戦略を実行' : '選択した行動を実行'}
              </button>
            </div>
          )}

          {/* Executing Feedback */}
          {showResultMessage && (
            <div className="flex justify-center">
              <div className="bg-green-800 bg-opacity-50 rounded-lg px-6 py-3 text-center">
                <div className="flex items-center justify-center space-x-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-400"></div>
                  <p className="text-green-200 font-medium">戦略実行中...</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mini Game Section */}
        {!showResultMessage && (
          <div className="mt-8 bg-gradient-to-r from-green-800 to-emerald-800 bg-opacity-50 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center">
              🎮 資金調達ミニゲーム
              <span className="ml-2 text-sm text-gray-300">- 投資家プレゼンテーション</span>
            </h3>
            <p className="text-gray-200 text-sm mb-4">
              資金が不足している時は、投資家へのプレゼンテーションゲームで追加資金を調達できます！
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => handleMiniGameStart('easy')}
                className="bg-green-700 hover:bg-green-600 text-white p-4 rounded-lg transition-all transform hover:scale-105"
              >
                <div className="text-lg font-semibold mb-2">🟢 初心者向け</div>
                <div className="text-sm text-green-200">
                  • 制限時間: 30秒<br/>
                  • 基本報酬: $100K<br/>
                  • 難易度: 簡単
                </div>
              </button>
              
              <button
                onClick={() => handleMiniGameStart('medium')}
                className="bg-yellow-700 hover:bg-yellow-600 text-white p-4 rounded-lg transition-all transform hover:scale-105"
              >
                <div className="text-lg font-semibold mb-2">🟡 中級者向け</div>
                <div className="text-sm text-yellow-200">
                  • 制限時間: 25秒<br/>
                  • 基本報酬: $300K<br/>
                  • 難易度: 普通
                </div>
              </button>
              
              <button
                onClick={() => handleMiniGameStart('hard')}
                className="bg-red-700 hover:bg-red-600 text-white p-4 rounded-lg transition-all transform hover:scale-105"
              >
                <div className="text-lg font-semibold mb-2">🔴 上級者向け</div>
                <div className="text-sm text-red-200">
                  • 制限時間: 20秒<br/>
                  • 基本報酬: $500K<br/>
                  • 難易度: 困難
                </div>
              </button>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-400">
                💡 ヒント: 高難易度ほど高額な資金を調達できますが、成功が困難になります
              </p>
            </div>
          </div>
        )}

        {/* Recent Actions */}
        {gameState.storyProgress.completedActions.length > 0 && (
          <div className="mt-12 bg-black bg-opacity-30 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4">最近の行動履歴</h3>
            <div className="space-y-2">
              {gameState.storyProgress.completedActions.slice(-5).map((action, index) => (
                <div key={index} className="text-gray-300 text-sm">
                  • {action}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Mini Game Modal */}
      <MiniGame
        isOpen={showMiniGame}
        onClose={handleMiniGameClose}
        onSuccess={handleMiniGameSuccess}
        difficultyLevel={miniGameDifficulty}
        currentCash={gameState.company.cash}
      />
    </div>
  );
};

export default StoryMode;