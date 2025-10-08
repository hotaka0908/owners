// シンプル会社経営ゲーム用の型定義

export interface CompanyMetrics {
  name: string;
  marketCap: number;
  cash: number;
  happyPeople: number;
  reputation: number;
  employees: number;
  month: number;
  year: number;
  revenue: number;
  monthlyProfit: number;
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  urgency: 'high' | 'medium' | 'low';
  category: 'product' | 'market' | 'finance' | 'operations' | 'external';
}

export interface DecisionOption {
  id: string;
  type: 'aggressive' | 'safe' | 'innovative';
  title: string;
  description: string;
  cost: number;
  risk: 'high' | 'medium' | 'low';
  potentialEffects: {
    marketCapChange: { min: number; max: number };
    cashChange: { min: number; max: number };
    happyPeopleChange: { min: number; max: number };
    reputationChange: { min: number; max: number };
    employeesChange: { min: number; max: number };
  };
}

export interface DecisionResult {
  success: boolean;
  message: string;
  effects: {
    marketCapChange: number;
    cashChange: number;
    happyPeopleChange: number;
    reputationChange: number;
    employeesChange: number;
  };
  nextEvent?: GameEvent;
  educationalFeedback?: {
    why: string; // なぜこの結果になったか
    lesson: string; // 学べること
    tip: string; // 次回のヒント
  };
}

export interface GameState {
  company: CompanyMetrics;
  currentEvent: GameEvent | null;
  availableDecisions: DecisionOption[];
  history: MarketCapHistoryPoint[];
  gamePhase: 'setup' | 'playing' | 'completed';
  isProcessing: boolean;
  pastDecisions: string[]; // 過去の決定IDを記録
  turnCount: number; // ターン数
  lastDecisionResult?: DecisionResult; // 最後の決定結果（フィードバック表示用）
}

export interface MarketCapHistoryPoint {
  month: string;
  value: number;
  happyPeople: number;
}