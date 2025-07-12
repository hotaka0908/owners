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