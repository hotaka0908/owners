import type { GameState, ActionChoice, GameTurn } from '../types/game';

// AI generated choice templates based on game state
export const generateAIChoices = (gameState: GameState): ActionChoice[] => {
  const choices: ActionChoice[] = [];
  const currentSituation = analyzeGameSituation(gameState);
  
  // Choice 1: Financial focused
  choices.push({
    id: 'financial-action',
    title: getFinancialActionTitle(gameState),
    description: getFinancialActionDescription(gameState),
    category: 'ai',
    difficulty: getDifficultyBasedOnResources(gameState),
    requiredResources: getFinancialRequirements(gameState),
    potentialOutcomes: generateFinancialOutcomes(gameState)
  });

  // Choice 2: Technology/Innovation focused
  choices.push({
    id: 'innovation-action',
    title: getInnovationActionTitle(gameState),
    description: getInnovationActionDescription(gameState),
    category: 'ai',
    difficulty: 'medium',
    requiredResources: { researchPoints: 5, cash: 100000 },
    potentialOutcomes: generateInnovationOutcomes(gameState)
  });

  // Choice 3: Market expansion focused
  choices.push({
    id: 'market-action',
    title: getMarketActionTitle(gameState),
    description: getMarketActionDescription(gameState),
    category: 'ai',
    difficulty: 'medium',
    requiredResources: { cash: 500000, employees: 10 },
    potentialOutcomes: generateMarketOutcomes(gameState)
  });

  // Choice 4: Social impact focused
  choices.push({
    id: 'social-action',
    title: getSocialActionTitle(gameState),
    description: getSocialActionDescription(gameState),
    category: 'ai',
    difficulty: 'easy',
    requiredResources: { cash: 200000, reputation: 50 },
    potentialOutcomes: generateSocialOutcomes(gameState)
  });

  // Choice 5: Competition/Strategy focused
  choices.push({
    id: 'strategy-action',
    title: getStrategyActionTitle(gameState),
    description: getStrategyActionDescription(gameState),
    category: 'ai',
    difficulty: 'hard',
    requiredResources: { cash: 1000000, employees: 50 },
    potentialOutcomes: generateStrategyOutcomes(gameState)
  });

  // Choice 6: Risk/Emergency focused
  choices.push({
    id: 'emergency-action',
    title: getEmergencyActionTitle(gameState),
    description: getEmergencyActionDescription(gameState),
    category: 'ai',
    difficulty: currentSituation.isInCrisis ? 'hard' : 'medium',
    requiredResources: getEmergencyRequirements(gameState),
    potentialOutcomes: generateEmergencyOutcomes(gameState)
  });

  return choices;
};

// Analyze current game situation
const analyzeGameSituation = (gameState: GameState) => {
  const { company, globalHappiness, currentQuarter } = gameState;
  
  return {
    isEarlyGame: currentQuarter <= 4,
    isLowCash: company.cash < 500000,
    isHighGrowth: company.marketCap > 10000000,
    isLowHappiness: globalHappiness < 60,
    isInCrisis: company.reputation < 30 || company.cash < 100000,
    hasProducts: gameState.products.length > 0,
    marketPresence: gameState.regions.filter(r => r.marketPenetration > 0).length
  };
};

// Financial action generators
const getFinancialActionTitle = (gameState: GameState): string => {
  const situation = analyzeGameSituation(gameState);
  
  if (situation.isLowCash) return "緊急資金調達を実行する";
  if (situation.isHighGrowth) return "新たな投資ラウンドを開始する";
  return "財務戦略を見直す";
};

const getFinancialActionDescription = (gameState: GameState): string => {
  const situation = analyzeGameSituation(gameState);
  
  if (situation.isLowCash) return "資金不足を解決するため、緊急の資金調達を行います。投資家からの出資やローンを検討します。";
  if (situation.isHighGrowth) return "急成長中の今こそ、さらなる拡大のための大型資金調達を実行します。";
  return "現在の財務状況を分析し、より効率的な資金運用戦略を策定します。";
};

const getFinancialRequirements = (gameState: GameState) => {
  const situation = analyzeGameSituation(gameState);
  
  if (situation.isLowCash) return { employees: 5 };
  if (situation.isHighGrowth) return { cash: 1000000, reputation: 70 };
  return { cash: 200000, researchPoints: 3 };
};

// Innovation action generators
const getInnovationActionTitle = (gameState: GameState): string => {
  const situation = analyzeGameSituation(gameState);
  
  if (!situation.hasProducts) return "革新的な製品を開発する";
  if (gameState.researchPoints > 20) return "次世代技術の研究を開始する";
  return "既存製品を改良する";
};

const getInnovationActionDescription = (gameState: GameState): string => {
  const situation = analyzeGameSituation(gameState);
  
  if (!situation.hasProducts) return "市場に革命をもたらす、まったく新しい製品の開発に着手します。";
  if (gameState.researchPoints > 20) return "蓄積した研究ポイントを活用し、業界を変える次世代技術の開発を始めます。";
  return "現在の製品ラインナップを分析し、顧客満足度を向上させる改良を加えます。";
};

// Market action generators
const getMarketActionTitle = (gameState: GameState): string => {
  const situation = analyzeGameSituation(gameState);
  
  if (situation.marketPresence === 0) return "初の海外進出を果たす";
  if (situation.marketPresence < 3) return "新たな地域市場に進出する";
  return "市場シェアを拡大する";
};

const getMarketActionDescription = (gameState: GameState): string => {
  const situation = analyzeGameSituation(gameState);
  
  if (situation.marketPresence === 0) return "国内での成功を基に、初めての海外市場進出を計画します。";
  if (situation.marketPresence < 3) return "既存市場での経験を活かし、新しい地域への展開を図ります。";
  return "競合他社を上回るマーケティング戦略で、さらなるシェア拡大を目指します。";
};

// Social action generators
const getSocialActionTitle = (gameState: GameState): string => {
  const situation = analyzeGameSituation(gameState);
  
  if (situation.isLowHappiness) return "世界の幸福度向上プロジェクトを開始する";
  if (gameState.company.reputation < 60) return "企業の社会的責任を果たす";
  return "慈善活動でブランド価値を高める";
};

const getSocialActionDescription = (gameState: GameState): string => {
  const situation = analyzeGameSituation(gameState);
  
  if (situation.isLowHappiness) return "低下している世界の幸福度を改善するため、大規模な社会貢献プロジェクトを立ち上げます。";
  if (gameState.company.reputation < 60) return "企業イメージを向上させるため、環境保護や教育支援などのCSR活動に注力します。";
  return "既に良好な企業イメージをさらに向上させる戦略的な慈善活動を展開します。";
};

// Strategy action generators
const getStrategyActionTitle = (gameState: GameState): string => {
  const competitors = gameState.competitors;
  const topCompetitor = competitors.reduce((prev, current) => 
    prev.marketCap > current.marketCap ? prev : current
  );
  
  if (gameState.company.marketCap < topCompetitor.marketCap * 0.1) return "業界トップとの戦略的提携を模索する";
  if (gameState.company.marketCap < topCompetitor.marketCap * 0.5) return "競合他社の買収を検討する";
  return "業界リーダーの地位を確立する";
};

const getStrategyActionDescription = (gameState: GameState): string => {
  const competitors = gameState.competitors;
  const topCompetitor = competitors.reduce((prev, current) => 
    prev.marketCap > current.marketCap ? prev : current
  );
  
  if (gameState.company.marketCap < topCompetitor.marketCap * 0.1) return "業界最大手との戦略的パートナーシップを通じて、技術とノウハウを獲得します。";
  if (gameState.company.marketCap < topCompetitor.marketCap * 0.5) return "急成長のため、中堅競合企業の買収による事業拡大を検討します。";
  return "業界をリードする立場として、新たなスタンダードと業界の未来を定義します。";
};

// Emergency action generators
const getEmergencyActionTitle = (gameState: GameState): string => {
  const situation = analyzeGameSituation(gameState);
  
  if (situation.isInCrisis) return "危機管理対策を実行する";
  if (gameState.currentQuarter % 4 === 0) return "年末の業績総括を行う";
  return "予期せぬ課題に対処する";
};

const getEmergencyActionDescription = (gameState: GameState): string => {
  const situation = analyzeGameSituation(gameState);
  
  if (situation.isInCrisis) return "現在の危機的状況を打開するため、緊急対策チームを編成し迅速な対応を図ります。";
  if (gameState.currentQuarter % 4 === 0) return "年末を迎え、今年の成果を総括し来年の戦略を策定します。";
  return "突発的に発生した課題や機会に対して、柔軟かつ迅速に対応策を講じます。";
};

const getEmergencyRequirements = (gameState: GameState) => {
  const situation = analyzeGameSituation(gameState);
  
  if (situation.isInCrisis) return { cash: 300000, employees: 20 };
  return { cash: 100000, researchPoints: 2 };
};

const getDifficultyBasedOnResources = (gameState: GameState): 'easy' | 'medium' | 'hard' => {
  const { company } = gameState;
  
  if (company.cash > 1000000 && company.employees > 100) return 'easy';
  if (company.cash > 500000 && company.employees > 50) return 'medium';
  return 'hard';
};

// Outcome generators
const generateFinancialOutcomes = (gameState: GameState) => {
  const situation = analyzeGameSituation(gameState);
  
  return {
    success: {
      title: "資金調達成功",
      description: "予想を上回る資金調達に成功し、財務基盤が大幅に強化されました。",
      effects: {
        cash: situation.isHighGrowth ? 5000000 : 2000000,
        reputation: 10,
        marketCap: situation.isHighGrowth ? 10000000 : 3000000
      },
      nextTurnDescription: "豊富な資金を活用し、次の大きな成長戦略を検討できます。"
    },
    partial: {
      title: "資金調達一部成功",
      description: "計画の70%程度の資金調達に成功。まずまずの結果です。",
      effects: {
        cash: situation.isHighGrowth ? 3000000 : 1000000,
        reputation: 5
      },
      nextTurnDescription: "追加の資金調達または節約戦略を検討する必要があります。"
    },
    failure: {
      title: "資金調達失敗",
      description: "投資家からの関心を得ることができず、資金調達に失敗しました。",
      effects: {
        reputation: -10,
        cash: -100000
      },
      nextTurnDescription: "別の資金源を探すか、事業規模を縮小せざるを得ません。"
    }
  };
};

const generateInnovationOutcomes = (_gameState: GameState) => ({
  success: {
    title: "革新的製品開発成功",
    description: "業界に革命をもたらす画期的な製品の開発に成功しました！",
    effects: {
      newProducts: ["革新的新製品"],
      researchPoints: 20,
      reputation: 15,
      marketCap: 5000000
    },
    nextTurnDescription: "新製品のローンチに向けて、マーケティング戦略を策定します。"
  },
  partial: {
    title: "製品改良成功",
    description: "既存製品の改良により、品質と顧客満足度が向上しました。",
    effects: {
      researchPoints: 10,
      reputation: 8,
      happiness: 50000
    },
    nextTurnDescription: "改良した製品の市場投入効果を監視し、次の開発を計画します。"
  },
  failure: {
    title: "開発プロジェクト失敗",
    description: "技術的な困難により、開発プロジェクトが頓挫してしまいました。",
    effects: {
      cash: -500000,
      researchPoints: -5,
      reputation: -5
    },
    nextTurnDescription: "失敗から学び、より堅実なアプローチで次の開発を進めます。"
  }
});

const generateMarketOutcomes = (_gameState: GameState) => ({
  success: {
    title: "市場進出大成功",
    description: "新市場での事業展開が予想を大幅に上回る成功を収めました！",
    effects: {
      newRegions: ["新規市場"],
      cash: 2000000,
      happiness: 200000,
      marketCap: 8000000
    },
    nextTurnDescription: "成功した市場での更なる拡大戦略を検討します。"
  },
  partial: {
    title: "市場進出成功",
    description: "新市場での立ち上げが順調に進み、基盤を築くことができました。",
    effects: {
      newRegions: ["新規市場"],
      cash: 800000,
      happiness: 100000,
      marketCap: 3000000
    },
    nextTurnDescription: "市場での地位を固めるため、現地化戦略を進めます。"
  },
  failure: {
    title: "市場進出失敗",
    description: "現地の文化や規制への理解不足により、市場進出に失敗しました。",
    effects: {
      cash: -1000000,
      reputation: -8
    },
    nextTurnDescription: "失敗の原因を分析し、より慎重な市場参入戦略を立て直します。"
  }
});

const generateSocialOutcomes = (_gameState: GameState) => ({
  success: {
    title: "社会貢献プロジェクト大成功",
    description: "社会貢献活動が大きな話題となり、世界中から称賛を受けました！",
    effects: {
      happiness: 500000,
      reputation: 20,
      marketCap: 3000000
    },
    nextTurnDescription: "高まった社会的信頼を活かし、さらなる事業展開を図ります。"
  },
  partial: {
    title: "社会貢献活動成功",
    description: "CSR活動が認められ、企業イメージの向上につながりました。",
    effects: {
      happiness: 200000,
      reputation: 12,
      marketCap: 1000000
    },
    nextTurnDescription: "継続的な社会貢献で企業価値をさらに高めます。"
  },
  failure: {
    title: "社会貢献活動失敗",
    description: "善意の活動でしたが、効果的な実行ができずに期待を下回りました。",
    effects: {
      cash: -200000,
      reputation: -3
    },
    nextTurnDescription: "より効果的な社会貢献の方法を検討し直します。"
  }
});

const generateStrategyOutcomes = (_gameState: GameState) => ({
  success: {
    title: "戦略的成功",
    description: "大胆な戦略が功を奏し、業界での地位が大幅に向上しました！",
    effects: {
      marketCap: 15000000,
      cash: 3000000,
      employees: 100,
      reputation: 25
    },
    nextTurnDescription: "業界リーダーとして、次の成長フェーズを主導します。"
  },
  partial: {
    title: "戦略的前進",
    description: "戦略の一部が成功し、競争力の向上を実現しました。",
    effects: {
      marketCap: 5000000,
      cash: 1000000,
      employees: 30,
      reputation: 10
    },
    nextTurnDescription: "成功した戦略を拡大し、残る課題に取り組みます。"
  },
  failure: {
    title: "戦略的失敗",
    description: "大胆すぎる戦略が裏目に出て、大きな損失を被りました。",
    effects: {
      cash: -2000000,
      reputation: -15,
      employees: -20
    },
    nextTurnDescription: "損失を最小限に抑え、堅実な戦略で立て直しを図ります。"
  }
});

const generateEmergencyOutcomes = (_gameState: GameState) => ({
  success: {
    title: "危機管理成功",
    description: "迅速な対応により危機を乗り越え、さらに強固な体制を築きました。",
    effects: {
      reputation: 15,
      cash: 500000,
      employees: 20
    },
    nextTurnDescription: "危機を教訓に、より堅牢な事業基盤を構築します。"
  },
  partial: {
    title: "危機対応完了",
    description: "なんとか危機を乗り切りましたが、いくつかの課題が残りました。",
    effects: {
      reputation: 5,
      cash: 100000
    },
    nextTurnDescription: "残された課題に対処しながら、事業を正常化させます。"
  },
  failure: {
    title: "危機対応失敗",
    description: "対応が後手に回り、事態がさらに悪化してしまいました。",
    effects: {
      reputation: -20,
      cash: -500000,
      employees: -10
    },
    nextTurnDescription: "深刻な状況を受け、抜本的な改革が必要になりました。"
  }
});

export const processCustomChoice = (gameState: GameState, userInput: string): ActionChoice => {
  return {
    id: 'custom-action',
    title: `カスタム戦略: ${userInput}`,
    description: `あなたの独自のアイデア「${userInput}」を実行します。成功すれば大きな成果が期待できますが、リスクも伴います。`,
    category: 'custom',
    difficulty: 'medium',
    requiredResources: {
      cash: 300000,
      employees: 15,
      researchPoints: 5
    },
    potentialOutcomes: generateCustomOutcomes(userInput, gameState)
  };
};

const generateCustomOutcomes = (userInput: string, _gameState: GameState) => ({
  success: {
    title: "独自戦略大成功！",
    description: `「${userInput}」というあなたの独創的なアイデアが見事に成功し、業界に新たな風を吹き込みました！`,
    effects: {
      cash: 2000000,
      reputation: 20,
      marketCap: 5000000,
      happiness: 300000,
      researchPoints: 15
    },
    nextTurnDescription: "成功した独自戦略を基に、さらなる革新を追求します。"
  },
  partial: {
    title: "独自戦略一部成功",
    description: `「${userInput}」のアイデアは部分的に成功し、新しい可能性を示しました。`,
    effects: {
      cash: 800000,
      reputation: 10,
      marketCap: 2000000,
      happiness: 150000,
      researchPoints: 8
    },
    nextTurnDescription: "成功した部分を伸ばしつつ、改善点を見つけて発展させます。"
  },
  failure: {
    title: "独自戦略失敗",
    description: `「${userInput}」は革新的でしたが、実現が困難で期待した成果を得られませんでした。`,
    effects: {
      cash: -500000,
      reputation: -5,
      researchPoints: -3
    },
    nextTurnDescription: "失敗から貴重な経験を得て、次の挑戦に活かします。"
  }
});

export const generateNewTurn = (gameState: GameState): GameTurn => {
  const newTurnNumber = gameState.currentTurn.turnNumber + 1;
  const situation = generateSituationDescription(gameState, newTurnNumber);
  const choices = generateAIChoices(gameState);
  
  return {
    turnNumber: newTurnNumber,
    currentSituation: situation,
    availableChoices: choices,
    customChoice: {
      enabled: true
    }
  };
};

const generateSituationDescription = (gameState: GameState, turnNumber: number): string => {
  const { company, globalHappiness, currentQuarter, currentYear } = gameState;
  const situation = analyzeGameSituation(gameState);
  
  const templates = [
    `${company.name}は${currentYear}年第${currentQuarter}四半期を迎えました。現在の時価総額は${formatCurrency(company.marketCap)}、世界の幸福度は${globalHappiness}%です。`,
    `ターン${turnNumber}: 激変する市場環境の中で、${company.name}は重要な局面を迎えています。`,
    `新たな挑戦の時です。現在の企業価値は${formatCurrency(company.marketCap)}、${Math.floor(globalHappiness * 100000000 / 100)}人の人々を幸せにしています。`,
    `${company.name}の成長ストーリーは続きます。次の一手が会社の未来を大きく左右するでしょう。`
  ];
  
  let baseDescription = templates[turnNumber % templates.length];
  
  if (situation.isInCrisis) {
    baseDescription += " しかし、現在は危機的な状況にあり、迅速な対応が求められています。";
  } else if (situation.isHighGrowth) {
    baseDescription += " 順調な成長を続けており、次の飛躍のチャンスを掴むときです。";
  } else if (situation.isEarlyGame) {
    baseDescription += " まだ創業期の段階で、将来への基盤作りが重要です。";
  }
  
  return baseDescription;
};

const formatCurrency = (amount: number): string => {
  if (amount >= 1e12) return `$${(amount / 1e12).toFixed(1)}兆`;
  if (amount >= 1e9) return `$${(amount / 1e9).toFixed(1)}B`;
  if (amount >= 1e6) return `$${(amount / 1e6).toFixed(1)}M`;
  if (amount >= 1e3) return `$${(amount / 1e3).toFixed(1)}K`;
  return `$${amount.toFixed(0)}`;
};