import React, { useState } from 'react';
import type { CompanyMetrics } from '../types/simple-game';

interface MetricsBarProps {
  company: CompanyMetrics;
}

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>
      {show && (
        <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg w-48 text-center">
          {text}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
};

export const MetricsBar: React.FC<MetricsBarProps> = ({ company }) => {
  const formatCurrency = (amount: number): string => {
    if (amount >= 1e12) return `$${(amount / 1e12).toFixed(1)}兆`;
    if (amount >= 1e9) return `$${(amount / 1e9).toFixed(1)}B`;
    if (amount >= 1e6) return `$${(amount / 1e6).toFixed(1)}M`;
    if (amount >= 1e3) return `$${(amount / 1e3).toFixed(1)}K`;
    return `$${Math.round(amount).toLocaleString()}`;
  };

  const formatPeople = (count: number): string => {
    if (count >= 1e8) return `${(count / 1e8).toFixed(1)}億人`;
    if (count >= 1e4) return `${(count / 1e4).toFixed(1)}万人`;
    return `${Math.round(count).toLocaleString()}人`;
  };

  return (
    <div className="space-y-4">
      {/* 主要メトリクス */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* 時価総額 */}
        <Tooltip text="企業の市場価値。株価×発行株式数で算出され、企業の成長を示す重要指標です。">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg p-4 transform hover:scale-105 transition-all cursor-help">
            <div className="text-center">
              <div className="text-3xl mb-1">💰</div>
              <div className="text-white font-bold text-lg drop-shadow-md">
                {formatCurrency(company.marketCap)}
              </div>
              <div className="text-yellow-100 text-xs font-medium">時価総額</div>
            </div>
          </div>
        </Tooltip>

        {/* 幸せな人々 */}
        <Tooltip text="あなたの製品・サービスで幸せになった人の数。社会的インパクトを測る指標です。">
          <div className="bg-gradient-to-br from-pink-400 to-red-500 rounded-xl shadow-lg p-4 transform hover:scale-105 transition-all cursor-help">
            <div className="text-center">
              <div className="text-3xl mb-1">😊</div>
              <div className="text-white font-bold text-lg drop-shadow-md">
                {formatPeople(company.happyPeople)}
              </div>
              <div className="text-pink-100 text-xs font-medium">幸せな人々</div>
            </div>
          </div>
        </Tooltip>

        {/* 現金 */}
        <Tooltip text="すぐに使える資金。運営費の支払いや投資に必要です。枯渇するとゲームオーバー。">
          <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-lg p-4 transform hover:scale-105 transition-all cursor-help">
            <div className="text-center">
              <div className="text-3xl mb-1">💵</div>
              <div className="text-white font-bold text-lg drop-shadow-md">
                {formatCurrency(company.cash)}
              </div>
              <div className="text-green-100 text-xs font-medium">現金</div>
            </div>
          </div>
        </Tooltip>
      </div>

      {/* 評判と従業員数 (プログレスバー形式) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* 評判 */}
        <Tooltip text="企業の社会的信頼度。高いほど収益が増加します。0-100で評価されます。">
          <div className="bg-white rounded-xl shadow-lg p-4 cursor-help hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">⭐</span>
                <span className="font-bold text-gray-800">評判</span>
              </div>
              <span className="font-bold text-purple-600">{company.reputation}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-400 to-purple-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${company.reputation}%` }}
              ></div>
            </div>
          </div>
        </Tooltip>

        {/* 従業員数 */}
        <Tooltip text="チームの規模。多いほど事業拡大が可能ですが、人件費も増加します。">
          <div className="bg-white rounded-xl shadow-lg p-4 cursor-help hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">👥</span>
                <span className="font-bold text-gray-800">従業員</span>
              </div>
              <span className="font-bold text-blue-600">{company.employees.toLocaleString()}人</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min((company.employees / 10000) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1 text-right">
              月間人件費: {formatCurrency(company.employees * 5000)}
            </div>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};