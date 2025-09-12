import React from 'react';
import type { CompanyMetrics } from '../types/simple-game';

interface MetricsBarProps {
  company: CompanyMetrics;
}

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
    <div className="grid grid-cols-3 gap-4">
      {/* 時価総額 */}
      <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg p-4 transform hover:scale-105 transition-transform">
        <div className="text-center">
          <div className="text-3xl mb-1 animate-pulse">💰</div>
          <div className="text-white font-bold text-lg drop-shadow-md">
            {formatCurrency(company.marketCap)}
          </div>
          <div className="text-yellow-100 text-xs">時価総額</div>
        </div>
      </div>

      {/* 幸せな人々 */}
      <div className="bg-gradient-to-br from-pink-400 to-red-500 rounded-xl shadow-lg p-4 transform hover:scale-105 transition-transform">
        <div className="text-center">
          <div className="text-3xl mb-1 animate-bounce">😊</div>
          <div className="text-white font-bold text-lg drop-shadow-md">
            {formatPeople(company.happyPeople)}
          </div>
          <div className="text-pink-100 text-xs">幸せな人々</div>
        </div>
      </div>

      {/* 現金 */}
      <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-lg p-4 transform hover:scale-105 transition-transform">
        <div className="text-center">
          <div className="text-3xl mb-1 animate-pulse">💵</div>
          <div className="text-white font-bold text-lg drop-shadow-md">
            {formatCurrency(company.cash)}
          </div>
          <div className="text-green-100 text-xs">現金</div>
        </div>
      </div>
    </div>
  );
};