import { useState, useCallback } from 'react';
import type { GameState, CompanyMetrics, DecisionResult } from '../types/simple-game';
import { selectRandomEvent, getDecisionsForEvent } from '../data/game-events';

const INITIAL_COMPANY: CompanyMetrics = {
  name: '',
  marketCap: 1000000, // $1M
  cash: 1000000, // $1M 初期資金
  happyPeople: 0,
  reputation: 50,
  employees: 1,
  month: 1,
  year: 2024,
  revenue: 0,
  monthlyProfit: 0
};

const INITIAL_GAME_STATE: Omit<GameState, 'company'> = {
  currentEvent: null,
  availableDecisions: [],
  history: [],
  gamePhase: 'setup',
  isProcessing: false,
  pastDecisions: [],
  turnCount: 0
};

export const useSimpleGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    company: INITIAL_COMPANY,
    ...INITIAL_GAME_STATE
  });
  const [usedEvents, setUsedEvents] = useState<string[]>([]);

  // ゲーム開始
  const startGame = useCallback((companyName: string) => {
    const newCompany = { ...INITIAL_COMPANY, name: companyName };
    const firstEvent = selectRandomEvent('startup', []);

    setGameState({
      company: newCompany,
      currentEvent: firstEvent,
      availableDecisions: firstEvent ? getDecisionsForEvent(firstEvent.id) : [],
      history: [{
        month: `${newCompany.year}年${newCompany.month}月`,
        value: newCompany.marketCap,
        happyPeople: newCompany.happyPeople
      }],
      gamePhase: 'playing',
      isProcessing: false,
      pastDecisions: [],
      turnCount: 0
    });

    if (firstEvent) {
      setUsedEvents([firstEvent.id]);
    }
  }, []);

  // 決定を実行
  const makeDecision = useCallback((decisionId: string) => {
    if (!gameState.currentEvent || gameState.isProcessing) return;

    setGameState(prev => ({ ...prev, isProcessing: true }));

    // 意図的な遅延で現実感を演出
    setTimeout(() => {
      const decision = gameState.availableDecisions.find(d => d.id === decisionId);
      if (!decision) {
        setGameState(prev => ({ ...prev, isProcessing: false }));
        return;
      }

      const result = executeDecision(gameState, decision);
      const newCompany = applyDecisionEffects(gameState.company, result);
      
      // 時間を進める
      const newMonth = newCompany.month === 12 ? 1 : newCompany.month + 1;
      const newYear = newCompany.month === 12 ? newCompany.year + 1 : newCompany.year;
      
      const updatedCompany = {
        ...newCompany,
        month: newMonth,
        year: newYear
      };

      // 成長段階を判定
      const gamePhase = determineGamePhase(updatedCompany);
      
      // 次のイベントを選択
      const nextEvent = selectRandomEvent(gamePhase, usedEvents);
      const newTurnCount = gameState.turnCount + 1;

      // ゲーム終了条件: 20ターンまたは資金枯渇
      const isGameOver = newTurnCount >= 20 || updatedCompany.cash <= 0 || !nextEvent;

      setGameState({
        company: updatedCompany,
        currentEvent: nextEvent,
        availableDecisions: nextEvent ? getDecisionsForEvent(nextEvent.id) : [],
        history: [
          ...gameState.history,
          {
            month: `${updatedCompany.year}年${updatedCompany.month}月`,
            value: updatedCompany.marketCap,
            happyPeople: updatedCompany.happyPeople
          }
        ].slice(-12), // 直近12ヶ月分のみ保持
        gamePhase: isGameOver ? 'completed' : 'playing',
        isProcessing: false,
        pastDecisions: [...gameState.pastDecisions, decisionId],
        turnCount: newTurnCount
      });

      if (nextEvent) {
        setUsedEvents(prev => [...prev, nextEvent.id]);
      }
    }, 1500); // 1.5秒の遅延
  }, [gameState, usedEvents]);

  // シナジー効果を計算
  const calculateSynergyBonus = (decision: any, pastDecisions: string[]): number => {
    let synergyBonus = 1.0;

    // AI関連のシナジー
    if (decision.id.includes('ai') || decision.id.includes('innovative')) {
      const aiDecisions = pastDecisions.filter(d => d.includes('ai') || d.includes('innovative')).length;
      synergyBonus += aiDecisions * 0.15; // AI投資の累積効果
    }

    // 安全戦略のシナジー
    if (decision.type === 'safe') {
      const safeDecisions = pastDecisions.filter(d => d.includes('safe') || d.includes('gradual')).length;
      synergyBonus += safeDecisions * 0.1; // 安定性ボーナス
    }

    // 積極戦略のシナジー
    if (decision.type === 'aggressive') {
      const aggressiveDecisions = pastDecisions.filter(d => d.includes('aggressive') || d.includes('full')).length;
      synergyBonus += aggressiveDecisions * 0.12; // 大胆さボーナス
    }

    return Math.min(synergyBonus, 2.0); // 最大2倍まで
  };

  // 決定を実行して結果を計算
  const executeDecision = (currentGameState: GameState, decision: any): DecisionResult => {
    // シナジー効果を計算
    const synergyBonus = calculateSynergyBonus(decision, currentGameState.pastDecisions);

    // リスクベースの成功判定（過去の経験で成功率向上）
    const baseSuccessRate = decision.risk === 'high' ? 0.6 : decision.risk === 'medium' ? 0.75 : 0.9;
    const experienceBonus = Math.min(currentGameState.pastDecisions.length * 0.02, 0.2); // 最大+20%
    const successRate = Math.min(baseSuccessRate + experienceBonus, 0.95);
    const isSuccess = Math.random() < successRate;

    const effects = decision.potentialEffects;
    const multiplier = (isSuccess ? (Math.random() * 0.5 + 0.75) : (Math.random() * 0.4 + 0.3)) * synergyBonus;

    return {
      success: isSuccess,
      message: generateResultMessage(decision, isSuccess),
      effects: {
        marketCapChange: Math.round(lerp(effects.marketCapChange.min, effects.marketCapChange.max, Math.random()) * multiplier),
        cashChange: effects.cashChange.min, // コストは固定
        happyPeopleChange: Math.round(lerp(effects.happyPeopleChange.min, effects.happyPeopleChange.max, Math.random()) * multiplier),
        reputationChange: Math.round(lerp(effects.reputationChange.min, effects.reputationChange.max, Math.random()) * multiplier),
        employeesChange: Math.round(lerp(effects.employeesChange.min, effects.employeesChange.max, Math.random()) * multiplier)
      }
    };
  };

  // 効果を会社の状態に適用
  const applyDecisionEffects = (company: CompanyMetrics, result: DecisionResult): CompanyMetrics => {
    const newCompany = {
      ...company,
      marketCap: Math.max(0, company.marketCap + result.effects.marketCapChange),
      cash: Math.max(0, company.cash + result.effects.cashChange),
      happyPeople: Math.max(0, company.happyPeople + result.effects.happyPeopleChange),
      reputation: Math.max(0, Math.min(100, company.reputation + result.effects.reputationChange)),
      employees: Math.max(1, company.employees + result.effects.employeesChange)
    };

    // 収益システム: 時価総額と評判に基づいて自動収益を計算
    const baseRevenue = newCompany.marketCap * 0.05; // 時価総額の5%
    const reputationMultiplier = newCompany.reputation / 100; // 評判ボーナス
    const monthlyRevenue = baseRevenue * reputationMultiplier;

    // 運営コスト: 従業員数に基づく
    const employeeCost = newCompany.employees * 5000; // 従業員1人あたり月$5,000
    const infrastructureCost = newCompany.marketCap * 0.02; // インフラコスト
    const totalCost = employeeCost + infrastructureCost;

    const monthlyProfit = monthlyRevenue - totalCost;

    return {
      ...newCompany,
      cash: Math.max(0, newCompany.cash + monthlyProfit),
      revenue: monthlyRevenue,
      monthlyProfit: monthlyProfit
    };
  };

  // 成長段階を判定
  const determineGamePhase = (company: CompanyMetrics): 'startup' | 'growth' | 'scale' => {
    if (company.marketCap >= 50000000000) return 'scale'; // $50B以上
    if (company.marketCap >= 1000000000) return 'growth'; // $1B以上
    return 'startup';
  };

  // 結果メッセージを生成
  const generateResultMessage = (decision: any, success: boolean): string => {
    const baseMessages = {
      aggressive: {
        success: '積極的な戦略が功を奏しました！市場での存在感が大幅に向上し、競合他社も注目しています。',
        failure: '積極的すぎるアプローチがリスクを生み出しました。しかし、この経験は将来の成長につながるでしょう。'
      },
      safe: {
        success: '安全な戦略により着実な成果を上げました。リスクを最小限に抑えながら確実に前進しています。',
        failure: '慎重なアプローチでしたが、期待した結果には至りませんでした。それでも大きな損失は避けられました。'
      },
      innovative: {
        success: '革新的なアイデアが市場に受け入れられました！業界内での評価が高まり、新たな可能性が開かれました。',
        failure: '革新的な挑戦は期待通りの結果を生みませんでしたが、貴重な学習機会となりました。'
      }
    };

    return baseMessages[decision.type as keyof typeof baseMessages][success ? 'success' : 'failure'];
  };

  // 線形補間ユーティリティ
  const lerp = (min: number, max: number, t: number): number => {
    return min + (max - min) * t;
  };

  // ゲームリセット
  const resetGame = useCallback(() => {
    setGameState({
      company: INITIAL_COMPANY,
      ...INITIAL_GAME_STATE
    });
    setUsedEvents([]);
  }, []);

  return {
    gameState,
    startGame,
    makeDecision,
    resetGame,
    isGameComplete: gameState.gamePhase === 'completed',
    currentPhase: determineGamePhase(gameState.company)
  };
};