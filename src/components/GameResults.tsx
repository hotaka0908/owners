import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';

const GameResults: React.FC = () => {
  const { gameState, restartGame, toggleGameMode } = useGame();
  const [showFireworks, setShowFireworks] = useState(false);
  const [companyName, setCompanyName] = useState('');

  const results = gameState.storyProgress.finalResults;
  
  useEffect(() => {
    setShowFireworks(true);
    const timer = setTimeout(() => setShowFireworks(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!results) return null;

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

  const getRankingColor = (ranking: string) => {
    switch (ranking) {
      case 'S': return 'text-yellow-300';
      case 'A': return 'text-blue-300';
      case 'B': return 'text-green-300';
      case 'C': return 'text-orange-300';
      case 'D': return 'text-red-300';
      default: return 'text-gray-300';
    }
  };

  const getRankingBg = (ranking: string) => {
    switch (ranking) {
      case 'S': return 'from-yellow-600 to-orange-600';
      case 'A': return 'from-blue-600 to-cyan-600';
      case 'B': return 'from-green-600 to-emerald-600';
      case 'C': return 'from-orange-600 to-red-600';
      case 'D': return 'from-red-600 to-pink-600';
      default: return 'from-gray-600 to-gray-700';
    }
  };

  const handleRestart = () => {
    if (companyName.trim()) {
      restartGame(companyName.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Fireworks Animation */}
      {showFireworks && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: '1s'
              }}
            >
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            </div>
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            🎉 ゲーム完了！ 🎉
          </h1>
          <p className="text-xl text-gray-300">
            20ターンの挑戦お疲れ様でした！
          </p>
        </div>

        {/* Ranking Display */}
        <div className={`bg-gradient-to-r ${getRankingBg(results.ranking)} rounded-lg p-8 mb-8 text-center`}>
          <div className="text-6xl md:text-8xl font-bold text-white mb-4">
            {results.ranking}
          </div>
          <div className="text-2xl md:text-3xl font-bold text-white mb-2">
            総合スコア: {results.finalScore}/100
          </div>
          <div className={`text-xl ${getRankingColor(results.ranking)}`}>
            {results.ranking === 'S' && '🏆 伝説の経営者！'}
            {results.ranking === 'A' && '⭐ 優秀な経営者！'}
            {results.ranking === 'B' && '👍 良い経営者！'}
            {results.ranking === 'C' && '📈 普通の経営者'}
            {results.ranking === 'D' && '💪 まだまだ成長の余地あり'}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">📊 最終結果</h2>
          <p className="text-gray-200 text-lg leading-relaxed mb-6">
            {results.summary}
          </p>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black bg-opacity-30 rounded-lg p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-green-400">
                {formatCurrency(gameState.company.marketCap)}
              </div>
              <div className="text-sm text-gray-300">時価総額</div>
            </div>
            
            <div className="bg-black bg-opacity-30 rounded-lg p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-400">
                {formatNumber(totalHappyPeople)}
              </div>
              <div className="text-sm text-gray-300">幸せな人々</div>
            </div>
            
            <div className="bg-black bg-opacity-30 rounded-lg p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-purple-400">
                {gameState.products.length}
              </div>
              <div className="text-sm text-gray-300">開発製品数</div>
            </div>
            
            <div className="bg-black bg-opacity-30 rounded-lg p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400">
                {gameState.company.reputation}
              </div>
              <div className="text-sm text-gray-300">企業イメージ</div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        {results.achievements.length > 0 && (
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">🏅 獲得実績</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {results.achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-opacity-20 rounded-lg p-3 text-white font-medium"
                >
                  {achievement}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action History */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">📋 行動履歴</h2>
          <div className="max-h-60 overflow-y-auto space-y-2">
            {gameState.storyProgress.completedActions.map((action, index) => (
              <div key={index} className="bg-black bg-opacity-30 rounded-lg p-3">
                <span className="text-gray-400 text-sm">ターン {index + 1}:</span>
                <span className="text-white ml-2">{action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {/* Restart Game */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">🔄 新しいゲームを開始</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="新しい会社名を入力..."
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleRestart()}
              />
              <button
                onClick={handleRestart}
                disabled={!companyName.trim()}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 px-6 rounded transition-all"
              >
                新しいゲーム開始
              </button>
            </div>
          </div>

          {/* Continue with Current Company */}
          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={toggleGameMode}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded transition-all"
            >
              📊 ダッシュボードで詳細確認
            </button>
            
            <button
              onClick={() => restartGame(gameState.company.name)}
              className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 px-6 rounded transition-all"
            >
              🔁 同じ会社でもう一度挑戦
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-400">
          <p>ありがとうございました！またの挑戦をお待ちしています 🚀</p>
        </div>
      </div>
    </div>
  );
};

export default GameResults;