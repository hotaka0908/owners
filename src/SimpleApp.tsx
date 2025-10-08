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

  // エンディング判定
  const getEnding = () => {
    const { marketCap, happyPeople, cash, reputation } = gameState.company;
    const turnCount = gameState.turnCount;

    // 資金枯渇エンディング
    if (cash <= 0) {
      return {
        title: '💸 破産エンディング',
        emoji: '😢',
        rank: 'F',
        color: 'red',
        message: '資金が枯渇してしまいました。経営判断が難しかったですね。',
        achievements: ['起業家の第一歩', '失敗から学ぶ']
      };
    }

    // パーフェクトエンディング
    if (marketCap >= 1e12 && happyPeople >= 10e9 && reputation >= 80) {
      return {
        title: '🌟 レジェンドCEO',
        emoji: '👑',
        rank: 'S+',
        color: 'purple',
        message: '時価総額1兆ドル、100億人の幸せ、そして高い評判。完璧な経営です！',
        achievements: ['世界最高CEO', '人類の希望', '伝説の企業家', 'パーフェクト経営']
      };
    }

    // 超優秀エンディング
    if (marketCap >= 5e11 && happyPeople >= 5e9) {
      return {
        title: '🏆 世界的CEO',
        emoji: '🌍',
        rank: 'S',
        color: 'yellow',
        message: '世界中に影響を与える偉大な企業を築き上げました！',
        achievements: ['グローバルリーダー', '社会貢献大賞', 'トップCEO']
      };
    }

    // 優秀エンディング
    if (marketCap >= 1e11 && happyPeople >= 1e9) {
      return {
        title: '⭐ 成功したCEO',
        emoji: '🎉',
        rank: 'A',
        color: 'green',
        message: '大成功です！多くの人々を幸せにする企業を作りました。',
        achievements: ['ユニコーン企業達成', '10億人の笑顔', 'ビジネス成功者']
      };
    }

    // 良好エンディング
    if (marketCap >= 1e10 || happyPeople >= 5e8) {
      return {
        title: '👍 堅実なCEO',
        emoji: '😊',
        rank: 'B',
        color: 'blue',
        message: '着実に成長する企業を築きました。良い経営です！',
        achievements: ['堅実経営', '成長企業', 'CEOの素質']
      };
    }

    // 普通エンディング
    if (turnCount >= 20) {
      return {
        title: '📈 新米CEO',
        emoji: '🌱',
        rank: 'C',
        color: 'gray',
        message: 'まだまだこれから。経験を積んで再挑戦しましょう！',
        achievements: ['起業家デビュー', '20ターン完走']
      };
    }

    return {
      title: '🎯 チャレンジャー',
      emoji: '💪',
      rank: 'D',
      color: 'orange',
      message: '挑戦は続きます。次はもっと上を目指しましょう！',
      achievements: ['起業家精神']
    };
  };

  // ゲーム完了時の画面
  if (isGameComplete) {
    const ending = getEnding();

    return (
      <div className={`min-h-screen bg-gradient-to-br from-${ending.color}-400 via-${ending.color}-500 to-${ending.color}-600 flex items-center justify-center p-4`}>
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl max-w-2xl w-full p-8 text-center border-8 border-white/50">
          <div className="text-8xl mb-6 animate-bounce">{ending.emoji}</div>
          <div className="text-6xl font-bold mb-2">{ending.rank}</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent mb-4">
            {ending.title}
          </h1>
          <p className="text-lg text-gray-700 mb-6">{ending.message}</p>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {gameState.company.name} の最終結果
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-sm font-semibold text-green-800">時価総額</div>
                <div className="text-xl font-bold text-green-600">
                  ${gameState.company.marketCap >= 1e12
                    ? `${(gameState.company.marketCap / 1e12).toFixed(1)}兆`
                    : gameState.company.marketCap >= 1e9
                    ? `${(gameState.company.marketCap / 1e9).toFixed(1)}B`
                    : `${(gameState.company.marketCap / 1e6).toFixed(1)}M`}
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-sm font-semibold text-blue-800">幸せな人々</div>
                <div className="text-xl font-bold text-blue-600">
                  {gameState.company.happyPeople >= 1e8
                    ? `${(gameState.company.happyPeople / 1e8).toFixed(1)}億人`
                    : `${(gameState.company.happyPeople / 1e4).toFixed(1)}万人`}
                </div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="text-sm font-semibold text-purple-800">現金</div>
                <div className="text-xl font-bold text-purple-600">
                  ${gameState.company.cash >= 1e9
                    ? `${(gameState.company.cash / 1e9).toFixed(1)}B`
                    : `${(gameState.company.cash / 1e6).toFixed(1)}M`}
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="text-sm font-semibold text-yellow-800">評判</div>
                <div className="text-xl font-bold text-yellow-600">{gameState.company.reputation}/100</div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">🏅 獲得した実績</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {ending.achievements.map((achievement, i) => (
                <div key={i} className="bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300 rounded-full px-4 py-2 text-sm font-medium text-yellow-900">
                  {achievement}
                </div>
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-600 mb-6">
            プレイ期間: {gameState.turnCount} ターン
          </div>

          <button
            onClick={resetGame}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
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