import React, { useState, useEffect, useCallback } from 'react';

interface MiniGameProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (earnedAmount: number) => void;
  difficultyLevel: 'easy' | 'medium' | 'hard';
  currentCash: number;
}

const MiniGame: React.FC<MiniGameProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  difficultyLevel,
  currentCash: _ 
}) => {
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'result'>('ready');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [targetPosition, setTargetPosition] = useState(50);
  const [playerPosition, setPlayerPosition] = useState(50);
  const [targetDirection, setTargetDirection] = useState(1);
  const [clicks, setClicks] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [gameResults, setGameResults] = useState<{
    finalScore: number;
    earnedAmount: number;
    performance: string;
  } | null>(null);

  // ゲーム設定
  const gameConfig = {
    easy: { 
      timeLimit: 30, 
      targetSpeed: 1, 
      baseReward: 100000,
      multiplier: 1.5 
    },
    medium: { 
      timeLimit: 25, 
      targetSpeed: 2, 
      baseReward: 300000,
      multiplier: 2.0 
    },
    hard: { 
      timeLimit: 20, 
      targetSpeed: 3, 
      baseReward: 500000,
      multiplier: 3.0 
    }
  };

  const config = gameConfig[difficultyLevel];

  // タイマー管理
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      endGame();
    }
  }, [gameState, timeLeft]);

  // ターゲット移動
  useEffect(() => {
    if (gameState === 'playing') {
      const moveInterval = setInterval(() => {
        setTargetPosition(prev => {
          let newPos = prev + (targetDirection * config.targetSpeed);
          let newDirection = targetDirection;
          
          if (newPos <= 0) {
            newPos = 0;
            newDirection = 1;
          } else if (newPos >= 100) {
            newPos = 100;
            newDirection = -1;
          }
          
          setTargetDirection(newDirection);
          return newPos;
        });
      }, 50);
      
      return () => clearInterval(moveInterval);
    }
  }, [gameState, targetDirection, config.targetSpeed]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(config.timeLimit);
    setClicks(0);
    setTargetPosition(50);
    setPlayerPosition(50);
    setAccuracy(0);
  };

  const handleClick = useCallback(() => {
    if (gameState !== 'playing') return;
    
    const distance = Math.abs(targetPosition - playerPosition);
    const hitThreshold = 15; // ヒット判定の範囲
    
    setClicks(prev => prev + 1);
    
    if (distance <= hitThreshold) {
      // ヒット成功
      const hitScore = Math.max(100 - distance * 5, 10);
      setScore(prev => prev + hitScore);
      
      // プレイヤー位置をターゲットに近づける
      setPlayerPosition(targetPosition);
      
      // エフェクト表示用のstate更新
      showHitEffect();
    } else {
      // ミス
      setScore(prev => Math.max(0, prev - 20));
    }
    
    // 精度計算
    const newAccuracy = clicks > 0 ? (score / (clicks * 100)) * 100 : 0;
    setAccuracy(Math.min(100, newAccuracy));
  }, [gameState, targetPosition, playerPosition, clicks, score]);

  const showHitEffect = () => {
    // 簡単なヒットエフェクト（実装は省略、視覚的フィードバック用）
  };

  const endGame = () => {
    const finalScore = score;
    const performanceRatio = Math.min(finalScore / 1000, 1);
    const earnedAmount = Math.round(config.baseReward * performanceRatio * config.multiplier);
    
    let performance = 'D';
    if (performanceRatio >= 0.9) performance = 'S';
    else if (performanceRatio >= 0.7) performance = 'A';
    else if (performanceRatio >= 0.5) performance = 'B';
    else if (performanceRatio >= 0.3) performance = 'C';
    
    setGameResults({
      finalScore,
      earnedAmount,
      performance
    });
    
    setGameState('result');
  };

  const handleClaim = () => {
    if (gameResults) {
      onSuccess(gameResults.earnedAmount);
      onClose();
    }
  };

  const handleClose = () => {
    setGameState('ready');
    setScore(0);
    setTimeLeft(config.timeLimit);
    setClicks(0);
    setAccuracy(0);
    setGameResults(null);
    onClose();
  };

  if (!isOpen) return null;

  const getDifficultyColor = () => {
    switch (difficultyLevel) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getDifficultyText = () => {
    switch (difficultyLevel) {
      case 'easy': return '簡単';
      case 'medium': return '普通';
      case 'hard': return '困難';
      default: return '不明';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto">
        {/* ゲーム準備画面 */}
        {gameState === 'ready' && (
          <div className="p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">💼 投資家プレゼンゲーム</h2>
            <p className="text-gray-300 mb-6">
              投資家の関心を引くタイミングでプレゼンテーションを行い、資金調達を成功させましょう！
            </p>
            
            <div className="bg-black bg-opacity-30 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">難易度:</span>
                  <span className={`ml-2 font-semibold ${getDifficultyColor()}`}>
                    {getDifficultyText()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">制限時間:</span>
                  <span className="ml-2 text-white">{config.timeLimit}秒</span>
                </div>
                <div>
                  <span className="text-gray-400">基本報酬:</span>
                  <span className="ml-2 text-green-400">
                    ${(config.baseReward / 1000).toFixed(0)}K
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">倍率:</span>
                  <span className="ml-2 text-blue-400">×{config.multiplier}</span>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">🎯 ゲームルール</h3>
              <div className="text-sm text-gray-300 space-y-2">
                <p>• 画面上を移動する投資家のタイミングに合わせてクリック</p>
                <p>• 正確にタイミングを合わせるほど高得点</p>
                <p>• 制限時間内にできるだけ多くの投資家にアピール</p>
                <p>• 最終スコアに応じて資金調達額が決定</p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={startGame}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded transition-all"
              >
                🚀 ゲーム開始
              </button>
              <button
                onClick={handleClose}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded transition-all"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}

        {/* ゲーム画面 */}
        {gameState === 'playing' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="text-white">
                <div className="text-lg font-semibold">⏰ {timeLeft}秒</div>
                <div className="text-sm text-gray-300">残り時間</div>
              </div>
              <div className="text-white text-center">
                <div className="text-2xl font-bold text-green-400">{score}</div>
                <div className="text-sm text-gray-300">スコア</div>
              </div>
              <div className="text-white text-right">
                <div className="text-lg font-semibold">{accuracy.toFixed(1)}%</div>
                <div className="text-sm text-gray-300">精度</div>
              </div>
            </div>
            
            {/* ゲームエリア */}
            <div className="bg-gradient-to-r from-blue-800 to-purple-800 rounded-lg p-6 mb-6 relative h-64">
              <div className="text-white text-center mb-4">
                <h3 className="text-lg font-semibold">投資家のタイミングに合わせてクリック！</h3>
              </div>
              
              {/* ゲームトラック */}
              <div className="relative h-32 bg-black bg-opacity-30 rounded-lg mb-4">
                {/* ターゲット（投資家） */}
                <div
                  className="absolute top-1/2 transform -translate-y-1/2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold transition-all duration-75"
                  style={{ left: `${targetPosition}%` }}
                >
                  💼
                </div>
                
                {/* プレイヤー位置インジケーター */}
                <div
                  className="absolute bottom-2 w-4 h-4 bg-green-400 rounded-full transition-all duration-300"
                  style={{ left: `${playerPosition}%` }}
                ></div>
                
                {/* センターライン */}
                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white bg-opacity-30"></div>
              </div>
              
              <button
                onClick={handleClick}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-lg transition-all text-xl"
              >
                🎤 プレゼンテーション実行！
              </button>
            </div>
            
            <div className="text-center text-gray-300 text-sm">
              クリック数: {clicks} | 目標を狙ってタイミングよくクリック！
            </div>
          </div>
        )}

        {/* 結果画面 */}
        {gameState === 'result' && gameResults && (
          <div className="p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">🎊 プレゼンテーション完了！</h2>
            
            <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg p-6 mb-6">
              <div className="text-4xl font-bold text-white mb-2">
                評価: {gameResults.performance}ランク
              </div>
              <div className="text-xl text-yellow-100">
                スコア: {gameResults.finalScore}点
              </div>
            </div>
            
            <div className="bg-black bg-opacity-30 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">💰 獲得資金</h3>
              <div className="text-3xl font-bold text-green-400 mb-2">
                +${(gameResults.earnedAmount / 1000).toFixed(0)}K
              </div>
              <div className="text-gray-300 text-sm">
                精度: {accuracy.toFixed(1)}% | クリック数: {clicks}
              </div>
            </div>
            
            <div className="mb-6">
              <div className="text-gray-300 text-sm">
                {gameResults.performance === 'S' && '🏆 完璧なプレゼンテーション！投資家から絶賛されました！'}
                {gameResults.performance === 'A' && '⭐ 優秀なプレゼンテーション！多くの投資家が関心を示しました！'}
                {gameResults.performance === 'B' && '👍 良いプレゼンテーション！投資家からポジティブな反応です！'}
                {gameResults.performance === 'C' && '📈 まずまずのプレゼンテーション。改善の余地があります。'}
                {gameResults.performance === 'D' && '💪 もう少し練習が必要です。次回はきっと上手くいきます！'}
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={handleClaim}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded transition-all"
              >
                💰 資金を受け取る
              </button>
              <button
                onClick={() => setGameState('ready')}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded transition-all"
              >
                🔄 もう一度挑戦
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniGame;