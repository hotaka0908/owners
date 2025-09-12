import React from 'react';
import type { GameEvent } from '../types/simple-game';

interface EventCardProps {
  event: GameEvent;
  isProcessing: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ event, isProcessing }) => {
  const getImpactColor = (impact: GameEvent['impact']): string => {
    switch (impact) {
      case 'positive':
        return 'bg-gradient-to-br from-green-400 to-emerald-500 border-l-green-600';
      case 'negative':
        return 'bg-gradient-to-br from-red-400 to-rose-500 border-l-red-600';
      default:
        return 'bg-gradient-to-br from-blue-400 to-indigo-500 border-l-blue-600';
    }
  };

  const getImpactIcon = (impact: GameEvent['impact']): string => {
    switch (impact) {
      case 'positive':
        return '📈';
      case 'negative':
        return '⚠️';
      default:
        return '📋';
    }
  };

  const getUrgencyBadge = (urgency: GameEvent['urgency']) => {
    const baseClasses = "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium";
    
    switch (urgency) {
      case 'high':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'medium':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-green-100 text-green-800`;
    }
  };

  const getUrgencyText = (urgency: GameEvent['urgency']): string => {
    switch (urgency) {
      case 'high':
        return '緊急';
      case 'medium':
        return '重要';
      default:
        return '通常';
    }
  };

  const getCategoryText = (category: GameEvent['category']): string => {
    switch (category) {
      case 'product':
        return '製品開発';
      case 'market':
        return '市場展開';
      case 'finance':
        return '財務';
      case 'operations':
        return '事業運営';
      case 'external':
        return '外部環境';
      default:
        return '一般';
    }
  };

  return (
    <div className={`rounded-xl shadow-xl border-l-8 ${getImpactColor(event.impact)} transition-all duration-500 transform hover:scale-105 ${isProcessing ? 'opacity-75 animate-pulse' : ''}`}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-4xl animate-bounce bg-white/20 rounded-full p-2">
              {getImpactIcon(event.impact)}
            </div>
            <h3 className="text-xl font-bold text-white drop-shadow-lg">
              {event.title}
            </h3>
          </div>
          {isProcessing && (
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-white/30 border-t-white"></div>
          )}
        </div>
        
        <p className="text-white/90 mt-4 text-base leading-relaxed bg-white/10 rounded-lg p-3">
          {event.description}
        </p>
        
        {!isProcessing && (
          <div className="mt-4 flex items-center justify-center">
            <div className="bg-white/20 rounded-full px-4 py-2 text-white font-medium text-sm animate-pulse">
              🎯 あなたの判断を選択してください
            </div>
          </div>
        )}
      </div>
    </div>
  );
};