import { CEODashboard } from './components/CEODashboard';
import { SimpleGameSetup } from './components/SimpleGameSetup';
import { useSimpleGame } from './hooks/useSimpleGame';

function SimpleApp() {
  const { 
    gameState, 
    startGame, 
    makeDecision, 
    resetGame, 
    isGameComplete 
  } = useSimpleGame();

  // ゲーム未開始の場合はセットアップ画面を表示
  if (gameState.gamePhase === 'setup') {
    return <SimpleGameSetup onStartGame={startGame} />;
  }

  // ゲーム完了時の画面
  if (isGameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-white to-yellow-50 rounded-3xl shadow-2xl max-w-2xl w-full p-8 text-center border-8 border-yellow-400">
          <div className="text-8xl mb-6 animate-bounce">🏆</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-6">
            🎉 ゲーム完了！ 🎉
          </h1>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {gameState.company.name} の最終結果
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-lg font-semibold text-green-800">時価総額</div>
                <div className="text-2xl font-bold text-green-600">
                  ${gameState.company.marketCap >= 1e12 
                    ? `${(gameState.company.marketCap / 1e12).toFixed(1)}兆` 
                    : gameState.company.marketCap >= 1e9 
                    ? `${(gameState.company.marketCap / 1e9).toFixed(1)}B`
                    : `${(gameState.company.marketCap / 1e6).toFixed(1)}M`}
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-lg font-semibold text-blue-800">幸せな人々</div>
                <div className="text-2xl font-bold text-blue-600">
                  {gameState.company.happyPeople >= 1e8 
                    ? `${(gameState.company.happyPeople / 1e8).toFixed(1)}億人`
                    : `${(gameState.company.happyPeople / 1e4).toFixed(1)}万人`}
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {gameState.company.marketCap >= 1e12 && (
              <div className="bg-purple-100 border border-purple-300 rounded-lg p-4">
                <div className="text-purple-800 font-semibold">🏆 兆ドル企業達成！</div>
                <div className="text-purple-700">世界最大級の企業を築き上げました</div>
              </div>
            )}
            
            {gameState.company.happyPeople >= 1e9 && (
              <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4">
                <div className="text-yellow-800 font-semibold">😊 10億人の笑顔達成！</div>
                <div className="text-yellow-700">世界中の人々の生活を改善しました</div>
              </div>
            )}
          </div>

          <button
            onClick={resetGame}
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
          >
            新しい会社で再挑戦
          </button>
        </div>
      </div>
    );
  }

  // メインゲーム画面
  return (
    <CEODashboard
      company={gameState.company}
      currentEvent={gameState.currentEvent}
      availableDecisions={gameState.availableDecisions}
      onDecision={makeDecision}
      isProcessing={gameState.isProcessing}
    />
  );
}

export default SimpleApp;