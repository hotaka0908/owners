import type { GameEvent, DecisionOption } from '../types/simple-game';

// 段階別のイベントデータ
export const STARTUP_EVENTS: GameEvent[] = [
  {
    id: 'first-product-idea',
    title: '🚀 最初の製品アイデア',
    description: '画期的な健康管理アプリのアイデアが浮かびました。開発にはお金と時間が必要です。',
    impact: 'positive',
    urgency: 'high',
    category: 'product'
  },
  {
    id: 'talent-acquisition',
    title: '👥 優秀な人材からの連絡',
    description: '有名IT企業の優秀なエンジニアが転職に興味を示しています。高額な給与が必要ですが開発が加速します。',
    impact: 'positive',
    urgency: 'medium',
    category: 'operations'
  },
  {
    id: 'competitor-launch',
    title: '⚡ 競合他社の新サービス発表',
    description: '大手テック企業が似たようなサービスを発表しました。差別化が急務です。',
    impact: 'negative',
    urgency: 'high',
    category: 'external'
  }
];

export const GROWTH_EVENTS: GameEvent[] = [
  {
    id: 'viral-growth',
    title: '📈 サービスがバイラル化',
    description: 'インフルエンサーの紹介でユーザー数が爆発的に増加。サーバー増強が必要です。',
    impact: 'positive',
    urgency: 'high',
    category: 'market'
  },
  {
    id: 'funding-opportunity',
    title: '💰 投資家からの資金調達提案',
    description: 'ベンチャーキャピタルが1000万ドルの投資を提案。株式30%が条件です。',
    impact: 'neutral',
    urgency: 'medium',
    category: 'finance'
  },
  {
    id: 'regulatory-challenge',
    title: '📋 規制当局からの審査',
    description: '政府がデータ処理方法を審査開始。コンプライアンス対応が急務です。',
    impact: 'negative',
    urgency: 'high',
    category: 'external'
  }
];

export const SCALE_EVENTS: GameEvent[] = [
  {
    id: 'global-expansion',
    title: '🌍 海外展開のチャンス',
    description: 'アジア太平洋地域の大手通信会社があなたのサービスのライセンス提携を提案してきました。これにより5億人の新規市場にアクセスできますが、現地化のための大規模な投資が必要です。',
    impact: 'positive',
    urgency: 'medium',
    category: 'market'
  },
  {
    id: 'acquisition-offer',
    title: '🏢 大手企業からの買収提案',
    description: 'Google、Apple、Microsoftのうち1社があなたの会社の買収を提案してきました。提示額は現在の市場価値の150%です。創業者として独立性を保つか、巨大プラットフォームの一部となってより大きな影響力を得るか、難しい決断です。',
    impact: 'neutral',
    urgency: 'low',
    category: 'finance'
  },
  {
    id: 'social-impact-opportunity',
    title: '🌟 社会貢献プロジェクトの機会',
    description: 'WHO（世界保健機関）があなたの技術を使って発展途上国の医療問題解決に協力してほしいと要請してきました。利益は少ないですが、10億人の生活改善に直接貢献でき、企業イメージも大幅に向上します。',
    impact: 'positive',
    urgency: 'medium',
    category: 'external'
  }
];

// 段階別の決定オプション
export const STARTUP_DECISIONS: Record<string, DecisionOption[]> = {
  'first-product-idea': [
    {
      id: 'aggressive-dev',
      type: 'aggressive',
      title: '全力投資',
      description: '手持ち資金の大部分を投入して最高品質の製品を作る',
      cost: 800000,
      risk: 'high',
      potentialEffects: {
        marketCapChange: { min: 2000000, max: 5000000 },
        cashChange: { min: -800000, max: -800000 },
        happyPeopleChange: { min: 100000, max: 500000 },
        reputationChange: { min: 10, max: 25 },
        employeesChange: { min: 5, max: 15 }
      }
    },
    {
      id: 'safe-dev',
      type: 'safe',
      title: '段階的開発',
      description: '最小限の機能から始めて、ユーザーフィードバックを元に改善',
      cost: 300000,
      risk: 'low',
      potentialEffects: {
        marketCapChange: { min: 500000, max: 2000000 },
        cashChange: { min: -300000, max: -300000 },
        happyPeopleChange: { min: 50000, max: 200000 },
        reputationChange: { min: 5, max: 15 },
        employeesChange: { min: 2, max: 8 }
      }
    },
    {
      id: 'innovative-dev',
      type: 'innovative',
      title: 'AI技術活用',
      description: '最新のAI技術を使って前例のない機能を開発する',
      cost: 600000,
      risk: 'medium',
      potentialEffects: {
        marketCapChange: { min: 1000000, max: 8000000 },
        cashChange: { min: -600000, max: -600000 },
        happyPeopleChange: { min: 75000, max: 800000 },
        reputationChange: { min: 15, max: 30 },
        employeesChange: { min: 3, max: 12 }
      }
    }
  ],
  
  'talent-acquisition': [
    {
      id: 'hire-expert',
      type: 'aggressive',
      title: '高額でも優秀な人材を獲得',
      description: '要求された給与を支払って即戦力を獲得する',
      cost: 500000,
      risk: 'medium',
      potentialEffects: {
        marketCapChange: { min: 1500000, max: 3000000 },
        cashChange: { min: -500000, max: -500000 },
        happyPeopleChange: { min: 20000, max: 100000 },
        reputationChange: { min: 5, max: 15 },
        employeesChange: { min: 1, max: 1 }
      }
    },
    {
      id: 'negotiate-terms',
      type: 'safe',
      title: '条件交渉を行う',
      description: '株式オプションなどを提案してコストを抑える',
      cost: 200000,
      risk: 'low',
      potentialEffects: {
        marketCapChange: { min: 800000, max: 2000000 },
        cashChange: { min: -200000, max: -200000 },
        happyPeopleChange: { min: 10000, max: 50000 },
        reputationChange: { min: 3, max: 10 },
        employeesChange: { min: 1, max: 1 }
      }
    },
    {
      id: 'build-team-culture',
      type: 'innovative',
      title: '魅力的な企業文化をアピール',
      description: '給与以外の価値を提示してより良い条件で契約',
      cost: 350000,
      risk: 'medium',
      potentialEffects: {
        marketCapChange: { min: 1200000, max: 2500000 },
        cashChange: { min: -350000, max: -350000 },
        happyPeopleChange: { min: 15000, max: 75000 },
        reputationChange: { min: 8, max: 20 },
        employeesChange: { min: 1, max: 1 }
      }
    }
  ]
};

export const GROWTH_DECISIONS: Record<string, DecisionOption[]> = {
  'viral-growth': [
    {
      id: 'scale-infrastructure',
      type: 'aggressive',
      title: 'インフラを大幅拡張',
      description: 'クラウドサーバーを大幅に増強して需要に対応',
      cost: 2000000,
      risk: 'high',
      potentialEffects: {
        marketCapChange: { min: 5000000, max: 15000000 },
        cashChange: { min: -2000000, max: -2000000 },
        happyPeopleChange: { min: 500000, max: 2000000 },
        reputationChange: { min: 10, max: 25 },
        employeesChange: { min: 10, max: 30 }
      }
    },
    {
      id: 'gradual-scaling',
      type: 'safe',
      title: '段階的にスケールアップ',
      description: '安定性を保ちながら慎重にユーザー数を増やす',
      cost: 800000,
      risk: 'low',
      potentialEffects: {
        marketCapChange: { min: 2000000, max: 6000000 },
        cashChange: { min: -800000, max: -800000 },
        happyPeopleChange: { min: 200000, max: 800000 },
        reputationChange: { min: 5, max: 15 },
        employeesChange: { min: 5, max: 15 }
      }
    },
    {
      id: 'smart-optimization',
      type: 'innovative',
      title: 'AI最適化でエレガントに対応',
      description: '機械学習を使ってシステム効率を劇的に向上',
      cost: 1200000,
      risk: 'medium',
      potentialEffects: {
        marketCapChange: { min: 3500000, max: 12000000 },
        cashChange: { min: -1200000, max: -1200000 },
        happyPeopleChange: { min: 350000, max: 1500000 },
        reputationChange: { min: 15, max: 30 },
        employeesChange: { min: 8, max: 20 }
      }
    }
  ]
};

// イベント選択ロジック
export const selectRandomEvent = (phase: 'startup' | 'growth' | 'scale', usedEvents: string[]): GameEvent | null => {
  let availableEvents: GameEvent[] = [];
  
  switch (phase) {
    case 'startup':
      availableEvents = STARTUP_EVENTS;
      break;
    case 'growth':
      availableEvents = GROWTH_EVENTS;
      break;
    case 'scale':
      availableEvents = SCALE_EVENTS;
      break;
  }

  const unusedEvents = availableEvents.filter(event => !usedEvents.includes(event.id));
  
  if (unusedEvents.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * unusedEvents.length);
  return unusedEvents[randomIndex];
};

// 決定オプション取得
export const getDecisionsForEvent = (eventId: string): DecisionOption[] => {
  return STARTUP_DECISIONS[eventId] || GROWTH_DECISIONS[eventId] || [];
};