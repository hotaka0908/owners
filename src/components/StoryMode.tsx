import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import type { ActionChoice } from '../types/game';

const StoryMode: React.FC = () => {
  const { gameState, executeChoice, toggleGameMode, message } = useGame();
  const [selectedChoice, setSelectedChoice] = useState<string>('');
  const [customInput, setCustomInput] = useState<string>('');
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);

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
    if (selectedChoice === 'custom') {
      if (customInput.trim()) {
        executeChoice('custom-action', customInput.trim());
        setCustomInput('');
      }
    } else {
      executeChoice(selectedChoice);
    }
    setSelectedChoice('');
    setShowCustomInput(false);
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
              <span className="text-gray-400 text-sm">ターン {gameState.currentTurn.turnNumber}</span>
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

      {/* Message Bar */}
      {message && (
        <div className="bg-blue-900 bg-opacity-50 border-l-4 border-blue-400 p-4">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-blue-200">{message}</p>
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
                  disabled={!canAfford}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    isSelected
                      ? 'border-blue-400 bg-blue-900 bg-opacity-50'
                      : canAfford
                      ? 'border-gray-600 bg-gray-800 bg-opacity-50 hover:border-gray-500 hover:bg-opacity-70'
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
                className={`w-full p-3 rounded border-2 text-left transition-all ${
                  selectedChoice === 'custom'
                    ? 'border-pink-400 bg-pink-900 bg-opacity-50'
                    : 'border-gray-600 bg-gray-800 bg-opacity-50 hover:border-gray-500'
                }`}
              >
                <span className="text-white font-medium">カスタム戦略を実行する</span>
              </button>
              
              {showCustomInput && (
                <div className="space-y-3">
                  <textarea
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="あなたのアイデアを詳しく説明してください...（例：AIを活用した教育プラットフォームを開発し、世界中の子供たちに無料で提供する）"
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-pink-400"
                    rows={3}
                  />
                  <div className="text-xs text-gray-400">
                    必要リソース: 資金 $300K、従業員 15人、研究ポイント 5pt
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Execute Button */}
          {selectedChoice && (
            <div className="flex justify-center">
              <button
                onClick={handleExecuteChoice}
                disabled={selectedChoice === 'custom' && !customInput.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
              >
                {selectedChoice === 'custom' ? 'カスタム戦略を実行' : '選択した行動を実行'}
              </button>
            </div>
          )}
        </div>

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
    </div>
  );
};

export default StoryMode;