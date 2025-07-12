import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

const GameSetup: React.FC = () => {
  const { startNewGame } = useGame();
  const [companyName, setCompanyName] = useState('');

  const handleStartGame = () => {
    if (companyName.trim()) {
      startNewGame(companyName.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            グローバル・ハピネス株式会社
          </h1>
          <p className="text-gray-600">
            世界100億人を幸せにする会社を経営しよう
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
              会社名
            </label>
            <input
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="あなたの会社名を入力してください"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleStartGame()}
            />
          </div>

          <button
            onClick={handleStartGame}
            disabled={!companyName.trim()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            経営を開始する
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>🎯 目標: 世界100億人を幸せにする</p>
          <p>💰 時価総額世界一位を達成する</p>
        </div>
      </div>
    </div>
  );
};

export default GameSetup;