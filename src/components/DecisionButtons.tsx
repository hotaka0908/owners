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


  const formatCurrency = (amount: number): string => {
    if (amount >= 1e9) return `$${(amount / 1e9).toFixed(1)}B`;
    if (amount >= 1e6) return `$${(amount / 1e6).toFixed(1)}M`;
    if (amount >= 1e3) return `$${(amount / 1e3).toFixed(1)}K`;
    return `$${Math.round(amount).toLocaleString()}`;
  };

  const canAfford = (cost: number): boolean => companyCash >= cost;

  const getRiskBadge = (risk: DecisionOption['risk']) => {
    switch (risk) {
      case 'high':
        return { text: '高リスク', color: 'bg-red-500', icon: '⚡' };
      case 'medium':
        return { text: '中リスク', color: 'bg-yellow-500', icon: '⚠️' };
      case 'low':
        return { text: '低リスク', color: 'bg-green-500', icon: '✓' };
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-700 mb-1">💡 あなたの選択</h3>
        <p className="text-sm text-gray-600">カードにマウスを重ねると詳細が表示されます</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {decisions.map((decision) => {
          const affordable = canAfford(decision.cost);
          const isDisabled = disabled || !affordable;
          const riskBadge = getRiskBadge(decision.risk);

          return (
            <div key={decision.id} className="group relative">
              <button
                onClick={() => onDecision(decision.id)}
                disabled={isDisabled}
                className={`
                  relative overflow-hidden rounded-2xl border-4 text-center transition-all duration-300 transform w-full
                  ${getTypeColor(decision.type)}
                  ${isDisabled
                    ? 'opacity-40 cursor-not-allowed scale-95'
                    : 'hover:shadow-2xl hover:scale-105 cursor-pointer active:scale-95'
                  }
                  p-5 shadow-xl
                `}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-white/10 opacity-20"></div>

                {/* Risk Badge */}
                <div className={`absolute top-2 right-2 ${riskBadge.color} text-white text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1 shadow-lg z-20`}>
                  <span>{riskBadge.icon}</span>
                  <span>{riskBadge.text}</span>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="text-4xl mb-2 drop-shadow-lg">
                    {getTypeIcon(decision.type)}
                  </div>
                  <div className="font-bold text-white text-base mb-2 drop-shadow-md min-h-[2.5rem] flex items-center justify-center">
                    {decision.title}
                  </div>
                  <div className="bg-white/20 rounded-full px-3 py-1 inline-block mb-2">
                    <div className={`text-sm font-bold ${affordable ? 'text-white' : 'text-red-200'}`}>
                      💰 {formatCurrency(decision.cost)}
                    </div>
                  </div>
                  {!affordable && (
                    <div className="text-red-200 text-xs font-medium animate-bounce">
                      ⚠️ 資金不足
                    </div>
                  )}
                </div>

                {/* Shine Effect */}
                {!isDisabled && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                )}
              </button>

              {/* Hover Detail Card */}
              {!isDisabled && (
                <div className="absolute left-0 right-0 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-30 pointer-events-none">
                  <div className="bg-white rounded-xl shadow-2xl p-4 border-2 border-gray-200">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {decision.description}
                    </p>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="text-xs text-gray-600 space-y-1">
                        <div className="flex justify-between">
                          <span>時価総額:</span>
                          <span className="font-medium text-yellow-600">
                            {formatCurrency(decision.potentialEffects.marketCapChange.min)} 〜 {formatCurrency(decision.potentialEffects.marketCapChange.max)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>幸せな人々:</span>
                          <span className="font-medium text-pink-600">
                            +{(decision.potentialEffects.happyPeopleChange.max / 1e6).toFixed(1)}M
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>評判変化:</span>
                          <span className="font-medium text-purple-600">
                            {decision.potentialEffects.reputationChange.min > 0 ? '+' : ''}{decision.potentialEffects.reputationChange.min} 〜 +{decision.potentialEffects.reputationChange.max}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};