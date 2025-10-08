import React from 'react';
import type { CompanyMetrics, GameEvent, DecisionOption, DecisionResult } from '../types/simple-game';
import { MetricsBar } from './MetricsBar';
import { EventCard } from './EventCard';
import { DecisionButtons } from './DecisionButtons';
import { EducationalFeedback } from './EducationalFeedback';

interface CEODashboardProps {
  company: CompanyMetrics;
  currentEvent: GameEvent | null;
  availableDecisions: DecisionOption[];
  onDecision: (decisionId: string) => void;
  isProcessing: boolean;
  turnCount?: number;
  lastDecisionResult?: DecisionResult;
}

export const CEODashboard: React.FC<CEODashboardProps> = ({
  company,
  currentEvent,
  availableDecisions,
  onDecision,
  isProcessing,
  turnCount = 0,
  lastDecisionResult
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-green-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
            <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-2">
              <span className="text-2xl sm:text-3xl">🏢</span>
              <span className="truncate max-w-[200px] sm:max-w-none">{company.name}</span>
              <span className="text-yellow-300">CEO</span>
            </h1>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="text-yellow-200 text-xs sm:text-sm font-medium bg-white/20 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
                🎯 {turnCount}/20
              </div>
              <div className="text-yellow-200 text-xs sm:text-sm font-medium bg-white/20 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
                📅 {company.year}年{company.month}月
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-3 sm:px-4 py-3 sm:py-4 space-y-3 sm:space-y-4">
        {/* Metrics Bar */}
        <MetricsBar company={company} />

        {/* Financial Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">月間収益</div>
                <div className="text-lg sm:text-xl font-bold text-green-600">
                  ${company.revenue >= 1e9
                    ? `${(company.revenue / 1e9).toFixed(2)}B`
                    : company.revenue >= 1e6
                    ? `${(company.revenue / 1e6).toFixed(2)}M`
                    : `${(company.revenue / 1e3).toFixed(1)}K`}
                </div>
              </div>
              <div className="text-2xl sm:text-3xl">💵</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">月間利益</div>
                <div className={`text-lg sm:text-xl font-bold ${company.monthlyProfit >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                  {company.monthlyProfit >= 0 ? '+' : ''}${company.monthlyProfit >= 1e9
                    ? `${(company.monthlyProfit / 1e9).toFixed(2)}B`
                    : company.monthlyProfit >= 1e6
                    ? `${(company.monthlyProfit / 1e6).toFixed(2)}M`
                    : `${(company.monthlyProfit / 1e3).toFixed(1)}K`}
                </div>
              </div>
              <div className="text-2xl sm:text-3xl">{company.monthlyProfit >= 0 ? '📈' : '📉'}</div>
            </div>
          </div>
        </div>

        {/* Educational Feedback from Last Decision */}
        {lastDecisionResult && lastDecisionResult.educationalFeedback && !isProcessing && (
          <EducationalFeedback feedback={lastDecisionResult.educationalFeedback} />
        )}

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