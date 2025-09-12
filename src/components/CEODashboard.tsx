import React from 'react';
import type { CompanyMetrics, GameEvent, DecisionOption } from '../types/simple-game';
import { MetricsBar } from './MetricsBar';
import { EventCard } from './EventCard';
import { DecisionButtons } from './DecisionButtons';

interface CEODashboardProps {
  company: CompanyMetrics;
  currentEvent: GameEvent | null;
  availableDecisions: DecisionOption[];
  onDecision: (decisionId: string) => void;
  isProcessing: boolean;
}

export const CEODashboard: React.FC<CEODashboardProps> = ({
  company,
  currentEvent,
  availableDecisions,
  onDecision,
  isProcessing
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-green-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
              <span className="text-3xl animate-bounce">🏢</span>
              <span>{company.name}</span>
              <span className="text-yellow-300">CEO</span>
            </h1>
            <div className="text-yellow-200 font-medium bg-white/20 px-3 py-1 rounded-full">
              📅 {company.year}年{company.month}月
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-4 space-y-4">
        {/* Metrics Bar */}
        <MetricsBar company={company} />

        {/* Current Event */}
        {currentEvent && (
          <EventCard 
            event={currentEvent} 
            isProcessing={isProcessing}
          />
        )}

        {/* Decision Buttons */}
        {availableDecisions.length > 0 && (
          <DecisionButtons 
            decisions={availableDecisions}
            onDecision={onDecision}
            disabled={isProcessing}
            companyCash={company.cash}
          />
        )}
      </main>
    </div>
  );
};