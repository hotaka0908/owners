export interface Company {
  name: string;
  founded: Date;
  marketCap: number;
  cash: number;
  revenue: number;
  profit: number;
  employees: number;
  reputation: number;
}

export interface Region {
  id: string;
  name: string;
  population: number;
  happinessLevel: number;
  marketPenetration: number;
  gdpPerCapita: number;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  developmentCost: number;
  developmentTime: number;
  qualityScore: number;
  socialImpactScore: number;
  price: number;
  isReleased: boolean;
}

export const ProductCategory = {
  EDUCATION: 'education',
  HEALTHCARE: 'healthcare',
  ENTERTAINMENT: 'entertainment',
  COMMUNICATION: 'communication',
  TRANSPORTATION: 'transportation',
  ENVIRONMENT: 'environment'
} as const;

export const ProductCategoryLabels = {
  education: '教育',
  healthcare: '医療',
  entertainment: 'エンターテイメント',
  communication: 'コミュニケーション',
  transportation: '交通',
  environment: '環境'
} as const;

export type ProductCategory = typeof ProductCategory[keyof typeof ProductCategory];

export interface GameState {
  company: Company;
  regions: Region[];
  products: Product[];
  currentQuarter: number;
  currentYear: number;
  globalHappiness: number;
  competitors: Company[];
  researchPoints: number;
  events: GameEvent[];
  currentTurn: GameTurn;
  gameMode: 'dashboard' | 'story';
  storyProgress: {
    totalTurns: number;
    completedActions: string[];
    currentSituation: string;
    isGameComplete: boolean;
    finalResults?: {
      finalScore: number;
      achievements: string[];
      summary: string;
      ranking: 'S' | 'A' | 'B' | 'C' | 'D';
    };
  };
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  impact: {
    happiness?: number;
    marketCap?: number;
    reputation?: number;
  };
  choices: EventChoice[];
}

export interface EventChoice {
  text: string;
  cost?: number;
  impact: {
    happiness?: number;
    marketCap?: number;
    reputation?: number;
  };
}

export interface ActionChoice {
  id: string;
  title: string;
  description: string;
  category: 'ai' | 'custom';
  difficulty: 'easy' | 'medium' | 'hard';
  requiredResources?: {
    cash?: number;
    employees?: number;
    researchPoints?: number;
    reputation?: number;
  };
  potentialOutcomes: {
    success: GameEventOutcome;
    partial: GameEventOutcome;
    failure: GameEventOutcome;
  };
}

export interface GameEventOutcome {
  title: string;
  description: string;
  effects: {
    cash?: number;
    employees?: number;
    reputation?: number;
    marketCap?: number;
    researchPoints?: number;
    happiness?: number;
    newProducts?: string[];
    newRegions?: string[];
  };
  nextTurnDescription: string;
}

export interface GameTurn {
  turnNumber: number;
  currentSituation: string;
  availableChoices: ActionChoice[];
  customChoice?: {
    enabled: boolean;
    userInput?: string;
  };
}

export interface ResearchProject {
  id: string;
  name: string;
  description: string;
  cost: number;
  duration: number;
  requiredRP: number;
  benefits: {
    efficiency?: number;
    socialImpact?: number;
    newProductCategory?: ProductCategory;
  };
}