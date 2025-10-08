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
    switch (urgency) {
      case 'high':
        return { text: '緊急', color: 'bg-red-600', icon: '🔥' };
      case 'medium':
        return { text: '重要', color: 'bg-yellow-600', icon: '⚡' };
      case 'low':
        return { text: '通常', color: 'bg-blue-600', icon: '📌' };
    }
  };

  const getCategoryInfo = (category: GameEvent['category']) => {
    switch (category) {
      case 'product':
        return { text: '製品開発', icon: '🚀' };
      case 'market':
        return { text: '市場動向', icon: '📊' };
      case 'finance':
        return { text: '財務', icon: '💰' };
      case 'operations':
        return { text: '業務運営', icon: '⚙️' };
      case 'external':
        return { text: '外部環境', icon: '🌍' };
    }
  };

  const urgencyBadge = getUrgencyBadge(event.urgency);
  const categoryInfo = getCategoryInfo(event.category);

  return (
    <div className={`rounded-xl shadow-xl border-l-8 ${getImpactColor(event.impact)} transition-all duration-500 transform hover:scale-[1.02] ${isProcessing ? 'opacity-75 animate-pulse' : ''}`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className="text-4xl bg-white/20 rounded-full p-3 flex-shrink-0">
              {getImpactIcon(event.impact)}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className={`${urgencyBadge.color} text-white text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1`}>
                  <span>{urgencyBadge.icon}</span>
                  <span>{urgencyBadge.text}</span>
                </span>
                <span className="bg-white/30 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center space-x-1">
                  <span>{categoryInfo.icon}</span>
                  <span>{categoryInfo.text}</span>
                </span>
              </div>
              <h3 className="text-xl font-bold text-white drop-shadow-lg">
                {event.title}
              </h3>
            </div>
          </div>
          {isProcessing && (
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-white/30 border-t-white flex-shrink-0"></div>
          )}
        </div>

        <p className="text-white/90 text-base leading-relaxed bg-white/10 rounded-lg p-4">
          {event.description}
        </p>

        {!isProcessing && (
          <div className="mt-4 flex items-center justify-center">
            <div className="bg-white/20 rounded-full px-5 py-2 text-white font-medium text-sm flex items-center space-x-2 shadow-lg">
              <span className="animate-pulse">🎯</span>
              <span>あなたの判断を選択してください</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};