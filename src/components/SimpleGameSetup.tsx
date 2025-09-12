import React, { useState } from 'react';

interface SimpleGameSetupProps {
  onStartGame: (companyName: string) => void;
}

export const SimpleGameSetup: React.FC<SimpleGameSetupProps> = ({ onStartGame }) => {
  const [companyName, setCompanyName] = useState('');
  const [isStarting, setIsStarting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (companyName.trim().length < 2) return;
    
    setIsStarting(true);
    
    // 少し遅延を入れてゲーム開始の演出
    setTimeout(() => {
      onStartGame(companyName.trim());
      setIsStarting(false);
    }, 1000);
  };

  const suggestedNames = [
    'TechVision Corp',
    'LifeImprove Inc',
    'FutureWorks',
    'SmartSolutions',
    'HealthTech Plus',
    'InnovateCorp',
    'NextGen Labs',
    'WellnessTech'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-green-500 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-white to-gray-100 rounded-3xl shadow-2xl max-w-2xl w-full p-8 border-4 border-white/50">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4 animate-bounce">🏢</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            🎮 CEO Simulator 🎮
          </h1>
          <p className="text-xl text-gray-700 font-medium">
            ✨ 時価総額世界一位を目指そう！ ✨
          </p>
        </div>

        {/* Game Overview */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">ゲームの目標</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">💰</span>
              <div>
                <div className="font-medium text-gray-900">時価総額世界一位</div>
                <div className="text-sm text-gray-600">企業価値を最大化</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">😊</span>
              <div>
                <div className="font-medium text-gray-900">10億人を幸せに</div>
                <div className="text-sm text-gray-600">社会に貢献する</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🚀</span>
              <div>
                <div className="font-medium text-gray-900">革新的な製品開発</div>
                <div className="text-sm text-gray-600">人々の生活を改善</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🌍</span>
              <div>
                <div className="font-medium text-gray-900">グローバル展開</div>
                <div className="text-sm text-gray-600">世界中に影響を与える</div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Setup */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              会社名を入力してください
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="あなたの会社名"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              maxLength={50}
              disabled={isStarting}
            />
            <p className="mt-1 text-sm text-gray-500">
              2文字以上、50文字以内で入力してください
            </p>
          </div>

          {/* Suggested Names */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">提案された会社名:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {suggestedNames.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setCompanyName(name)}
                  className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  disabled={isStarting}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Initial Conditions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-blue-900 mb-2">初期条件</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-blue-700 font-medium">初期資金</div>
                <div className="text-blue-600">$1,000,000</div>
              </div>
              <div>
                <div className="text-blue-700 font-medium">時価総額</div>
                <div className="text-blue-600">$1,000,000</div>
              </div>
              <div>
                <div className="text-blue-700 font-medium">従業員</div>
                <div className="text-blue-600">1名（あなた）</div>
              </div>
              <div>
                <div className="text-blue-700 font-medium">企業イメージ</div>
                <div className="text-blue-600">50/100</div>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <button
            type="submit"
            disabled={companyName.trim().length < 2 || isStarting}
            className={`w-full py-4 px-6 rounded-lg text-lg font-semibold transition-all ${
              companyName.trim().length >= 2 && !isStarting
                ? 'bg-blue-600 hover:bg-blue-700 text-white transform hover:-translate-y-1 shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isStarting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>ゲーム開始中...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <span>🚀</span>
                <span>CEOとしてスタート</span>
              </div>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>あなたの決断が世界を変える。準備はできましたか？</p>
        </div>
      </div>
    </div>
  );
};