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
  },
  {
    id: 'office-space-decision',
    title: '🏢 オフィススペースの選択',
    description: '事業拡大に向けて新しいオフィスが必要です。コワーキングスペース、レンタルオフィス、自社物件のどれを選びますか？',
    impact: 'neutral',
    urgency: 'medium',
    category: 'operations'
  },
  {
    id: 'early-customer-feedback',
    title: '📊 初期ユーザーからのフィードバック',
    description: 'ベータテスターから厳しいフィードバックが届きました。製品の方向性を見直すべきでしょうか？',
    impact: 'neutral',
    urgency: 'high',
    category: 'product'
  },
  {
    id: 'angel-investor-interest',
    title: '💰 エンジェル投資家からの関心',
    description: '著名なエンジェル投資家があなたのビジョンに興味を示しています。資金調達のチャンスです。',
    impact: 'positive',
    urgency: 'medium',
    category: 'finance'
  },
  {
    id: 'technical-debt-crisis',
    title: '⚠️ 技術的負債の蓄積',
    description: '急速な開発でコードベースが複雑化。今リファクタリングすべきか、機能開発を優先すべきか。',
    impact: 'negative',
    urgency: 'medium',
    category: 'product'
  },
  {
    id: 'media-coverage-opportunity',
    title: '📰 メディア取材のオファー',
    description: '大手ビジネスメディアから取材依頼が来ました。露出のチャンスですが準備時間が必要です。',
    impact: 'positive',
    urgency: 'high',
    category: 'external'
  },
  {
    id: 'cofounder-conflict',
    title: '👔 共同創業者との意見対立',
    description: '共同創業者と事業の方向性について意見が分かれています。どのように対処しますか？',
    impact: 'negative',
    urgency: 'high',
    category: 'operations'
  },
  {
    id: 'first-paying-customer',
    title: '🎉 初の有料顧客獲得',
    description: '最初の有料顧客を獲得しました！この勢いをどう活かしますか？',
    impact: 'positive',
    urgency: 'medium',
    category: 'market'
  },
  {
    id: 'server-downtime',
    title: '🔧 サーバー障害発生',
    description: '予期せぬサーバー障害でサービスが停止。ユーザーからの苦情が殺到しています。',
    impact: 'negative',
    urgency: 'high',
    category: 'product'
  },
  {
    id: 'accelerator-program-invite',
    title: '🚀 アクセラレータープログラムへの招待',
    description: '有名なスタートアップアクセラレーターから参加のオファーが届きました。',
    impact: 'positive',
    urgency: 'medium',
    category: 'external'
  },
  {
    id: 'pricing-strategy-debate',
    title: '💵 価格戦略の決定',
    description: '製品の価格設定をどうするか？フリーミアム、サブスクリプション、従量課金？',
    impact: 'neutral',
    urgency: 'high',
    category: 'finance'
  },
  {
    id: 'security-vulnerability',
    title: '🔒 セキュリティ脆弱性の発見',
    description: 'セキュリティ研究者から重大な脆弱性の報告が。早急な対応が必要です。',
    impact: 'negative',
    urgency: 'high',
    category: 'product'
  },
  {
    id: 'key-employee-resignation',
    title: '😢 重要メンバーの退職通知',
    description: '創業メンバーの1人が退職を申し出ました。引き留めるべきか、新しい人材を探すべきか。',
    impact: 'negative',
    urgency: 'high',
    category: 'operations'
  },
  {
    id: 'industry-conference',
    title: '🎤 業界カンファレンスでのプレゼン機会',
    description: '大規模な業界カンファレンスでプレゼンする機会が。準備に時間がかかりますが露出効果は大きいです。',
    impact: 'positive',
    urgency: 'medium',
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
  },
  {
    id: 'enterprise-client-opportunity',
    title: '🏦 大企業からの契約提案',
    description: 'Fortune 500企業があなたのサービスの導入を検討中。大型契約のチャンスです。',
    impact: 'positive',
    urgency: 'high',
    category: 'market'
  },
  {
    id: 'talent-war',
    title: '⚔️ 人材獲得競争',
    description: '競合他社が高給で優秀な従業員を引き抜こうとしています。対抗策が必要です。',
    impact: 'negative',
    urgency: 'high',
    category: 'operations'
  },
  {
    id: 'product-line-expansion',
    title: '🎯 新製品ラインの検討',
    description: '既存顧客から関連製品の要望が多数。新しい製品ラインを開発すべきか？',
    impact: 'positive',
    urgency: 'medium',
    category: 'product'
  },
  {
    id: 'market-downturn',
    title: '📉 市場全体の低迷',
    description: '経済不況で市場全体が縮小。コスト削減か、逆張り投資か。',
    impact: 'negative',
    urgency: 'high',
    category: 'external'
  },
  {
    id: 'partnership-proposal',
    title: '🤝 戦略的パートナーシップの提案',
    description: '業界リーダーから戦略的提携の提案が。市場アクセスが広がりますが独立性は失われます。',
    impact: 'neutral',
    urgency: 'medium',
    category: 'external'
  },
  {
    id: 'data-breach-attempt',
    title: '🚨 サイバー攻撃の試み',
    description: 'ハッカーグループからの攻撃を検知。セキュリティ投資の強化が必要です。',
    impact: 'negative',
    urgency: 'high',
    category: 'product'
  },
  {
    id: 'international-expansion-interest',
    title: '🌏 海外市場からの引き合い',
    description: 'ヨーロッパ市場からの問い合わせが急増。海外展開を始めるべきでしょうか？',
    impact: 'positive',
    urgency: 'medium',
    category: 'market'
  },
  {
    id: 'brand-reputation-crisis',
    title: '📢 SNSでの炎上',
    description: '製品の一部機能が批判され、SNSで炎上。早急な対応が求められます。',
    impact: 'negative',
    urgency: 'high',
    category: 'external'
  },
  {
    id: 'innovation-breakthrough',
    title: '💡 技術的ブレークスルー',
    description: 'R&Dチームが画期的な技術を開発。特許申請と商品化を急ぐべきです。',
    impact: 'positive',
    urgency: 'high',
    category: 'product'
  },
  {
    id: 'executive-recruitment',
    title: '👔 経験豊富なCFO候補',
    description: '大手企業のCFOがあなたの会社に興味を示しています。採用すべきでしょうか？',
    impact: 'positive',
    urgency: 'medium',
    category: 'operations'
  },
  {
    id: 'office-expansion-needed',
    title: '🏗️ オフィス拡張の必要性',
    description: '急成長で現在のオフィスが手狭に。移転、増床、リモート化のどれを選ぶ？',
    impact: 'neutral',
    urgency: 'medium',
    category: 'operations'
  },
  {
    id: 'customer-churn-increase',
    title: '😰 顧客離脱率の上昇',
    description: '既存顧客の解約率が急上昇。顧客満足度向上への投資が必要です。',
    impact: 'negative',
    urgency: 'high',
    category: 'market'
  },
  {
    id: 'industry-award-nomination',
    title: '🏆 業界賞へのノミネート',
    description: 'あなたの会社が「最も革新的なスタートアップ賞」にノミネートされました！',
    impact: 'positive',
    urgency: 'low',
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
  'competitor-launch': [
    {
      id: 'differentiate-product',
      type: 'aggressive',
      title: '独自機能で差別化',
      description: '競合にない革新的な機能を短期間で開発',
      cost: 400000,
      risk: 'high',
      potentialEffects: {
        marketCapChange: { min: 1500000, max: 4000000 },
        cashChange: { min: -400000, max: -400000 },
        happyPeopleChange: { min: 80000, max: 300000 },
        reputationChange: { min: 10, max: 25 },
        employeesChange: { min: 3, max: 10 }
      }
    },
    {
      id: 'focus-niche',
      type: 'safe',
      title: 'ニッチ市場に集中',
      description: '大手が狙わない特定領域で強みを確立',
      cost: 150000,
      risk: 'low',
      potentialEffects: {
        marketCapChange: { min: 600000, max: 1800000 },
        cashChange: { min: -150000, max: -150000 },
        happyPeopleChange: { min: 30000, max: 120000 },
        reputationChange: { min: 5, max: 15 },
        employeesChange: { min: 2, max: 6 }
      }
    },
    {
      id: 'pivot-business-model',
      type: 'innovative',
      title: 'ビジネスモデル変革',
      description: '全く新しいアプローチで市場を再定義',
      cost: 300000,
      risk: 'medium',
      potentialEffects: {
        marketCapChange: { min: 1000000, max: 3500000 },
        cashChange: { min: -300000, max: -300000 },
        happyPeopleChange: { min: 50000, max: 250000 },
        reputationChange: { min: 12, max: 30 },
        employeesChange: { min: 2, max: 8 }
      }
    }
  ],
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
  
  'office-space-decision': [
    {
      id: 'coworking-space',
      type: 'safe',
      title: 'コワーキングスペース',
      description: '低コストで柔軟性が高い選択',
      cost: 50000,
      risk: 'low',
      potentialEffects: {
        marketCapChange: { min: 200000, max: 800000 },
        cashChange: { min: -50000, max: -50000 },
        happyPeopleChange: { min: 10000, max: 50000 },
        reputationChange: { min: 2, max: 8 },
        employeesChange: { min: 1, max: 3 }
      }
    },
    {
      id: 'rental-office',
      type: 'innovative',
      title: 'レンタルオフィス',
      description: 'バランスの取れた選択肢',
      cost: 200000,
      risk: 'medium',
      potentialEffects: {
        marketCapChange: { min: 500000, max: 1500000 },
        cashChange: { min: -200000, max: -200000 },
        happyPeopleChange: { min: 20000, max: 100000 },
        reputationChange: { min: 5, max: 15 },
        employeesChange: { min: 2, max: 6 }
      }
    },
    {
      id: 'buy-property',
      type: 'aggressive',
      title: '自社物件購入',
      description: '長期的な投資だが初期コストが高い',
      cost: 600000,
      risk: 'high',
      potentialEffects: {
        marketCapChange: { min: 1200000, max: 3000000 },
        cashChange: { min: -600000, max: -600000 },
        happyPeopleChange: { min: 30000, max: 150000 },
        reputationChange: { min: 10, max: 25 },
        employeesChange: { min: 5, max: 12 }
      }
    }
  ],
  'early-customer-feedback': [
    {
      id: 'major-pivot',
      type: 'aggressive',
      title: '大幅な方向転換',
      description: 'フィードバックを元に製品を全面的に見直す',
      cost: 350000,
      risk: 'high',
      potentialEffects: {
        marketCapChange: { min: 800000, max: 3500000 },
        cashChange: { min: -350000, max: -350000 },
        happyPeopleChange: { min: 100000, max: 400000 },
        reputationChange: { min: 8, max: 25 },
        employeesChange: { min: 2, max: 8 }
      }
    },
    {
      id: 'minor-improvements',
      type: 'safe',
      title: '小規模な改善',
      description: '現在の方向性を維持しつつ問題点を修正',
      cost: 100000,
      risk: 'low',
      potentialEffects: {
        marketCapChange: { min: 400000, max: 1200000 },
        cashChange: { min: -100000, max: -100000 },
        happyPeopleChange: { min: 30000, max: 150000 },
        reputationChange: { min: 3, max: 12 },
        employeesChange: { min: 1, max: 4 }
      }
    },
    {
      id: 'ab-testing',
      type: 'innovative',
      title: 'データドリブンなA/Bテスト',
      description: '複数の改善案を並行してテスト',
      cost: 200000,
      risk: 'medium',
      potentialEffects: {
        marketCapChange: { min: 600000, max: 2500000 },
        cashChange: { min: -200000, max: -200000 },
        happyPeopleChange: { min: 50000, max: 250000 },
        reputationChange: { min: 8, max: 20 },
        employeesChange: { min: 2, max: 6 }
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
  'funding-opportunity': [
    {
      id: 'accept-vc-funding',
      type: 'aggressive',
      title: 'VC資金を受け入れる',
      description: '1000万ドルを獲得し急成長を目指す',
      cost: 0,
      risk: 'medium',
      potentialEffects: {
        marketCapChange: { min: 20000000, max: 50000000 },
        cashChange: { min: 10000000, max: 10000000 },
        happyPeopleChange: { min: 100000, max: 500000 },
        reputationChange: { min: 10, max: 25 },
        employeesChange: { min: 20, max: 50 }
      }
    },
    {
      id: 'decline-bootstrap',
      type: 'safe',
      title: '自己資金で成長',
      description: '独立性を保ち慎重に成長',
      cost: 0,
      risk: 'low',
      potentialEffects: {
        marketCapChange: { min: 3000000, max: 10000000 },
        cashChange: { min: 0, max: 0 },
        happyPeopleChange: { min: 50000, max: 200000 },
        reputationChange: { min: 5, max: 15 },
        employeesChange: { min: 5, max: 15 }
      }
    },
    {
      id: 'negotiate-better-terms',
      type: 'innovative',
      title: 'より良い条件を交渉',
      description: '株式希薄化を抑えつつ資金調達',
      cost: 0,
      risk: 'medium',
      potentialEffects: {
        marketCapChange: { min: 15000000, max: 35000000 },
        cashChange: { min: 7000000, max: 7000000 },
        happyPeopleChange: { min: 80000, max: 350000 },
        reputationChange: { min: 12, max: 22 },
        employeesChange: { min: 15, max: 35 }
      }
    }
  ],
  'regulatory-challenge': [
    {
      id: 'full-compliance',
      type: 'safe',
      title: '完全コンプライアンス対応',
      description: '専門チームを雇い徹底的に対応',
      cost: 1500000,
      risk: 'low',
      potentialEffects: {
        marketCapChange: { min: 3000000, max: 10000000 },
        cashChange: { min: -1500000, max: -1500000 },
        happyPeopleChange: { min: 50000, max: 200000 },
        reputationChange: { min: 15, max: 30 },
        employeesChange: { min: 8, max: 20 }
      }
    },
    {
      id: 'minimal-compliance',
      type: 'aggressive',
      title: '最小限の対応',
      description: 'リスクを取り、必要最小限の対応',
      cost: 500000,
      risk: 'high',
      potentialEffects: {
        marketCapChange: { min: -2000000, max: 5000000 },
        cashChange: { min: -500000, max: -500000 },
        happyPeopleChange: { min: -50000, max: 100000 },
        reputationChange: { min: -10, max: 10 },
        employeesChange: { min: 2, max: 8 }
      }
    },
    {
      id: 'lobby-for-change',
      type: 'innovative',
      title: '規制変更のロビー活動',
      description: '業界団体と協力し規制の見直しを働きかける',
      cost: 1000000,
      risk: 'medium',
      potentialEffects: {
        marketCapChange: { min: 5000000, max: 15000000 },
        cashChange: { min: -1000000, max: -1000000 },
        happyPeopleChange: { min: 100000, max: 300000 },
        reputationChange: { min: 10, max: 25 },
        employeesChange: { min: 5, max: 15 }
      }
    }
  ],
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

export const SCALE_DECISIONS: Record<string, DecisionOption[]> = {
  'global-expansion': [
    {
      id: 'full-localization',
      type: 'aggressive',
      title: '完全ローカライゼーション',
      description: '現地チームを雇用し、文化に完全適応したサービスを展開',
      cost: 50000000,
      risk: 'high',
      potentialEffects: {
        marketCapChange: { min: 100000000, max: 500000000 },
        cashChange: { min: -50000000, max: -50000000 },
        happyPeopleChange: { min: 10000000, max: 50000000 },
        reputationChange: { min: 15, max: 30 },
        employeesChange: { min: 100, max: 500 }
      }
    },
    {
      id: 'partnership-expansion',
      type: 'safe',
      title: 'パートナーシップ戦略',
      description: '現地企業と提携してリスクを分散',
      cost: 20000000,
      risk: 'low',
      potentialEffects: {
        marketCapChange: { min: 40000000, max: 200000000 },
        cashChange: { min: -20000000, max: -20000000 },
        happyPeopleChange: { min: 5000000, max: 20000000 },
        reputationChange: { min: 5, max: 15 },
        employeesChange: { min: 30, max: 150 }
      }
    },
    {
      id: 'ai-translation',
      type: 'innovative',
      title: 'AI自動ローカライゼーション',
      description: '最新AI技術で低コスト・高速展開を実現',
      cost: 30000000,
      risk: 'medium',
      potentialEffects: {
        marketCapChange: { min: 80000000, max: 400000000 },
        cashChange: { min: -30000000, max: -30000000 },
        happyPeopleChange: { min: 8000000, max: 35000000 },
        reputationChange: { min: 20, max: 35 },
        employeesChange: { min: 50, max: 250 }
      }
    }
  ],
  'acquisition-offer': [
    {
      id: 'reject-maintain-independence',
      type: 'aggressive',
      title: '買収を拒否し独立を維持',
      description: '自社の成長を信じて、独立路線を貫く',
      cost: 0,
      risk: 'high',
      potentialEffects: {
        marketCapChange: { min: -50000000, max: 300000000 },
        cashChange: { min: 0, max: 0 },
        happyPeopleChange: { min: 0, max: 10000000 },
        reputationChange: { min: -10, max: 20 },
        employeesChange: { min: -50, max: 100 }
      }
    },
    {
      id: 'accept-acquisition',
      type: 'safe',
      title: '買収を受け入れる',
      description: '巨大プラットフォームの一部となり安定を得る',
      cost: 0,
      risk: 'low',
      potentialEffects: {
        marketCapChange: { min: 500000000, max: 1000000000 },
        cashChange: { min: 100000000, max: 100000000 },
        happyPeopleChange: { min: 20000000, max: 100000000 },
        reputationChange: { min: -20, max: 10 },
        employeesChange: { min: 200, max: 1000 }
      }
    },
    {
      id: 'negotiate-partnership',
      type: 'innovative',
      title: '戦略的パートナーシップを交渉',
      description: '買収ではなく協力関係を提案し、両者の利益を最大化',
      cost: 0,
      risk: 'medium',
      potentialEffects: {
        marketCapChange: { min: 200000000, max: 800000000 },
        cashChange: { min: 50000000, max: 50000000 },
        happyPeopleChange: { min: 30000000, max: 80000000 },
        reputationChange: { min: 10, max: 30 },
        employeesChange: { min: 100, max: 500 }
      }
    }
  ],
  'social-impact-opportunity': [
    {
      id: 'full-commitment-nonprofit',
      type: 'aggressive',
      title: '全力でWHOプロジェクトに参加',
      description: '主力チームを投入して人類への貢献を最優先',
      cost: 30000000,
      risk: 'high',
      potentialEffects: {
        marketCapChange: { min: -20000000, max: 100000000 },
        cashChange: { min: -30000000, max: -30000000 },
        happyPeopleChange: { min: 100000000, max: 500000000 },
        reputationChange: { min: 30, max: 50 },
        employeesChange: { min: 50, max: 200 }
      }
    },
    {
      id: 'decline-focus-business',
      type: 'safe',
      title: '丁重に断り、ビジネスに集中',
      description: '企業成長を優先し、将来のより大きな貢献を目指す',
      cost: 0,
      risk: 'low',
      potentialEffects: {
        marketCapChange: { min: 50000000, max: 200000000 },
        cashChange: { min: 0, max: 0 },
        happyPeopleChange: { min: -10000000, max: 5000000 },
        reputationChange: { min: -15, max: 5 },
        employeesChange: { min: 20, max: 100 }
      }
    },
    {
      id: 'hybrid-approach',
      type: 'innovative',
      title: 'ハイブリッド戦略',
      description: '一部のリソースで協力し、ビジネスと社会貢献を両立',
      cost: 15000000,
      risk: 'medium',
      potentialEffects: {
        marketCapChange: { min: 30000000, max: 300000000 },
        cashChange: { min: -15000000, max: -15000000 },
        happyPeopleChange: { min: 50000000, max: 200000000 },
        reputationChange: { min: 20, max: 40 },
        employeesChange: { min: 50, max: 300 }
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
  return STARTUP_DECISIONS[eventId] || GROWTH_DECISIONS[eventId] || SCALE_DECISIONS[eventId] || [];
};