import React from 'react';
import type { DecisionOption } from '../types/simple-game';

interface DecisionButtonsProps {
  decisions: DecisionOption[];
  onDecision: (decisionId: string) => void;
  disabled: boolean;
  companyCash: number;
}

export const DecisionButtons: React.FC<DecisionButtonsProps> = ({
  decisions,
  onDecision,
  disabled,
  companyCash
}) => {
  const getTypeIcon = (type: DecisionOption['type']): string => {
    switch (type) {
      case 'aggressive':
        return '🚀';
      case 'safe':
        return '⚖️';
      case 'innovative':
        return '💡';
      default:
        return '📋';
    }
  };

  const getTypeColor = (type: DecisionOption['type']): string => {
    switch (type) {
      case 'aggressive':
        return 'bg-gradient-to-br from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 border-red-600 shadow-red-200';
      case 'safe':
        return 'bg-gradient-to-br from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 border-green-600 shadow-green-200';
      case 'innovative':
        return 'bg-gradient-to-br from-purple-400 to-indigo-500 hover:from-purple-500 hover:to-indigo-600 border-purple-600 shadow-purple-200';
      default:
        return 'bg-gradient-to-br from-gray-400 to-slate-500 hover:from-gray-500 hover:to-slate-600 border-gray-600 shadow-gray-200';
    }
  };

  const getTypeLabel = (type: DecisionOption['type']): string => {
    switch (type) {
      case 'aggressive':
        return '積極策';
      case 'safe':
        return '安全策';
      case 'innovative':
        return '革新策';
      default:
        return '一般策';
    }
  };

  const getRiskColor = (risk: DecisionOption['risk']): string => {
    switch (risk) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskText = (risk: DecisionOption['risk']): string => {
    switch (risk) {
      case 'high':
        return 'ハイリスク';
      case 'medium':
        return 'ミドルリスク';
      case 'low':
        return 'ローリスク';
      default:
        return '不明';
    }
  };

  const formatCurrency = (amount: number): string => {
    if (amount >= 1e9) return `$${(amount / 1e9).toFixed(1)}B`;
    if (amount >= 1e6) return `$${(amount / 1e6).toFixed(1)}M`;
    if (amount >= 1e3) return `$${(amount / 1e3).toFixed(1)}K`;
    return `$${Math.round(amount).toLocaleString()}`;
  };

  const canAfford = (cost: number): boolean => companyCash >= cost;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {decisions.map((decision) => {
        const affordable = canAfford(decision.cost);
        const isDisabled = disabled || !affordable;

        return (
          <button
            key={decision.id}
            onClick={() => onDecision(decision.id)}
            disabled={isDisabled}
            className={`
              relative overflow-hidden rounded-2xl border-4 text-center transition-all duration-300 transform
              ${getTypeColor(decision.type)}
              ${isDisabled 
                ? 'opacity-40 cursor-not-allowed scale-95' 
                : 'hover:shadow-2xl hover:scale-110 cursor-pointer active:scale-95'
              }
              p-6 shadow-xl
            `}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-white/10 opacity-20"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="text-5xl mb-3 animate-pulse drop-shadow-lg">
                {getTypeIcon(decision.type)}
              </div>
              <div className="font-bold text-white text-lg mb-2 drop-shadow-md">
                {decision.title}
              </div>
              <div className="bg-white/20 rounded-full px-3 py-1 inline-block">
                <div className={`text-sm font-bold ${affordable ? 'text-white' : 'text-red-200'}`}>
                  💰 {formatCurrency(decision.cost)}
                </div>
              </div>
              {!affordable && (
                <div className="text-red-200 text-xs mt-2 font-medium animate-bounce">
                  ⚠️ 資金不足
                </div>
              )}
            </div>

            {/* Shine Effect */}
            {!isDisabled && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
            )}
          </button>
        );
      })}
    </div>
  );
};