import type { GameState, Company, Region, Product } from '../types/game';
import { ProductCategory } from '../types/game';
import { generateNewTurn, generateAIChoices, processCustomChoice } from './storyLogic';

export const createInitialGameState = (companyName: string): GameState => {
  const initialCompany: Company = {
    name: companyName,
    founded: new Date(),
    marketCap: 1000000, // $1M
    cash: 100000, // $100K
    revenue: 0,
    profit: 0,
    employees: 1,
    reputation: 50
  };

  const initialRegions: Region[] = [
    {
      id: 'north-america',
      name: '北米',
      population: 579000000,
      happinessLevel: 65,
      marketPenetration: 0,
      gdpPerCapita: 65000
    },
    {
      id: 'europe',
      name: 'ヨーロッパ',
      population: 748000000,
      happinessLevel: 70,
      marketPenetration: 0,
      gdpPerCapita: 45000
    },
    {
      id: 'asia',
      name: 'アジア',
      population: 4641000000,
      happinessLevel: 55,
      marketPenetration: 0,
      gdpPerCapita: 15000
    },
    {
      id: 'africa',
      name: 'アフリカ',
      population: 1340000000,
      happinessLevel: 45,
      marketPenetration: 0,
      gdpPerCapita: 4000
    },
    {
      id: 'south-america',
      name: '南米',
      population: 434000000,
      happinessLevel: 50,
      marketPenetration: 0,
      gdpPerCapita: 8000
    },
    {
      id: 'oceania',
      name: 'オセアニア',
      population: 46000000,
      happinessLevel: 75,
      marketPenetration: 0,
      gdpPerCapita: 55000
    }
  ];

  const initialGameState: GameState = {
    company: initialCompany,
    regions: initialRegions,
    products: [],
    currentQuarter: 1,
    currentYear: 2025,
    globalHappiness: calculateGlobalHappiness(initialRegions),
    competitors: generateInitialCompetitors(),
    researchPoints: 10,
    events: [],
    gameMode: 'story',
    storyProgress: {
      totalTurns: 0,
      completedActions: [],
      currentSituation: `${companyName}の創業者として、あなたの壮大な旅が始まりました。世界100億人を幸せにし、時価総額世界一位を目指しましょう！`
    },
    currentTurn: {
      turnNumber: 1,
      currentSituation: `${companyName}の創業者として、あなたの壮大な旅が始まりました。世界100億人を幸せにし、時価総額世界一位を目指しましょう！`,
      availableChoices: [],
      customChoice: { enabled: true }
    }
  };

  // Generate initial choices
  initialGameState.currentTurn.availableChoices = generateAIChoices(initialGameState);
  
  return initialGameState;
};

export const calculateGlobalHappiness = (regions: Region[]): number => {
  const totalPopulation = regions.reduce((sum, region) => sum + region.population, 0);
  const weightedHappiness = regions.reduce((sum, region) => 
    sum + (region.happinessLevel * region.population), 0);
  
  return Math.round(weightedHappiness / totalPopulation);
};

export const advanceQuarter = (gameState: GameState): GameState => {
  const newQuarter = gameState.currentQuarter === 4 ? 1 : gameState.currentQuarter + 1;
  const newYear = gameState.currentQuarter === 4 ? gameState.currentYear + 1 : gameState.currentYear;
  
  const newCompany = calculateQuarterlyFinancials(gameState.company, gameState.products, gameState.regions);
  const newRegions = updateRegionHappiness(gameState.regions, gameState.products);
  
  return {
    ...gameState,
    company: newCompany,
    regions: newRegions,
    currentQuarter: newQuarter,
    currentYear: newYear,
    globalHappiness: calculateGlobalHappiness(newRegions),
    researchPoints: gameState.researchPoints + calculateResearchPoints(gameState.company)
  };
};

const calculateQuarterlyFinancials = (company: Company, products: Product[], regions: Region[]): Company => {
  let quarterlyRevenue = 0;
  
  products.filter(p => p.isReleased).forEach(product => {
    regions.forEach(region => {
      const regionRevenue = (region.population * region.marketPenetration / 100) * 
                           (product.price * 0.01) * (product.qualityScore / 100);
      quarterlyRevenue += regionRevenue;
    });
  });
  
  const operatingCosts = company.employees * 25000; // $25K per employee per quarter
  const quarterlyProfit = quarterlyRevenue - operatingCosts;
  
  const newMarketCap = company.marketCap + (quarterlyProfit * 20); // P/E ratio of 20
  
  return {
    ...company,
    revenue: company.revenue + quarterlyRevenue,
    profit: company.profit + quarterlyProfit,
    cash: company.cash + quarterlyProfit,
    marketCap: Math.max(newMarketCap, 0)
  };
};

const updateRegionHappiness = (regions: Region[], products: Product[]): Region[] => {
  return regions.map(region => {
    let happinessIncrease = 0;
    
    products.filter(p => p.isReleased).forEach(product => {
      const impact = (product.socialImpactScore / 100) * (region.marketPenetration / 100) * 0.1;
      happinessIncrease += impact;
    });
    
    return {
      ...region,
      happinessLevel: Math.min(100, region.happinessLevel + happinessIncrease)
    };
  });
};

const calculateResearchPoints = (company: Company): number => {
  return Math.floor(company.employees * 0.1) + Math.floor(company.revenue * 0.00001);
};

const generateInitialCompetitors = (): Company[] => {
  return [
    {
      name: 'TechCorp Global',
      founded: new Date('2015-01-01'),
      marketCap: 500000000000, // $500B
      cash: 50000000000,
      revenue: 100000000000,
      profit: 20000000000,
      employees: 200000,
      reputation: 75
    },
    {
      name: 'Innovation Industries',
      founded: new Date('2010-06-15'),
      marketCap: 800000000000, // $800B
      cash: 80000000000,
      revenue: 150000000000,
      profit: 30000000000,
      employees: 300000,
      reputation: 80
    }
  ];
};

export const developProduct = (
  gameState: GameState, 
  name: string, 
  category: ProductCategory, 
  investmentLevel: 'low' | 'medium' | 'high'
): { success: boolean; newGameState?: GameState; message: string } => {
  const costs = { low: 50000, medium: 200000, high: 500000 };
  const cost = costs[investmentLevel];
  
  if (gameState.company.cash < cost) {
    return { success: false, message: 'Insufficient funds for product development.' };
  }
  
  const qualityScore = { low: 60, medium: 75, high: 90 }[investmentLevel];
  const socialImpactScore = { low: 50, medium: 70, high: 85 }[investmentLevel];
  
  const newProduct: Product = {
    id: `product-${Date.now()}`,
    name,
    category,
    developmentCost: cost,
    developmentTime: 2, // 2 quarters
    qualityScore,
    socialImpactScore,
    price: cost * 0.01, // Price as percentage of development cost
    isReleased: false
  };
  
  const newGameState: GameState = {
    ...gameState,
    company: {
      ...gameState.company,
      cash: gameState.company.cash - cost
    },
    products: [...gameState.products, newProduct]
  };
  
  return { 
    success: true, 
    newGameState, 
    message: `Started development of ${name}. Will be ready in ${newProduct.developmentTime} quarters.` 
  };
};

export const enterMarket = (
  gameState: GameState,
  regionId: string,
  strategy: 'aggressive' | 'moderate' | 'conservative'
): { success: boolean; newGameState?: GameState; message: string } => {
  const costs = { aggressive: 1000000, moderate: 500000, conservative: 200000 };
  const penetration = { aggressive: 15, moderate: 8, conservative: 3 };
  
  const cost = costs[strategy];
  const marketPenetration = penetration[strategy];
  
  if (gameState.company.cash < cost) {
    return { success: false, message: 'Insufficient funds for market entry.' };
  }
  
  const regionIndex = gameState.regions.findIndex(r => r.id === regionId);
  if (regionIndex === -1) {
    return { success: false, message: 'Region not found.' };
  }
  
  const newRegions = [...gameState.regions];
  newRegions[regionIndex] = {
    ...newRegions[regionIndex],
    marketPenetration: Math.min(100, newRegions[regionIndex].marketPenetration + marketPenetration)
  };
  
  const newGameState: GameState = {
    ...gameState,
    company: {
      ...gameState.company,
      cash: gameState.company.cash - cost
    },
    regions: newRegions
  };
  
  return { 
    success: true, 
    newGameState, 
    message: `Successfully entered ${newRegions[regionIndex].name} market with ${strategy} strategy.` 
  };
};

export const executeStoryChoice = (
  gameState: GameState,
  choiceId: string,
  customInput?: string
): { success: boolean; newGameState: GameState; result: any } => {
  let selectedChoice;
  
  if (choiceId === 'custom-action' && customInput) {
    selectedChoice = processCustomChoice(gameState, customInput);
  } else {
    selectedChoice = gameState.currentTurn.availableChoices.find(choice => choice.id === choiceId);
  }
  
  if (!selectedChoice) {
    return { success: false, newGameState: gameState, result: null };
  }
  
  // Check if player has required resources
  const canAfford = checkResourceRequirements(gameState, selectedChoice);
  if (!canAfford.success) {
    return { 
      success: false, 
      newGameState: gameState, 
      result: { message: canAfford.message } 
    };
  }
  
  // Execute the choice and determine outcome
  const outcome = determineOutcome(selectedChoice);
  const newGameState = applyChoiceEffects(gameState, selectedChoice, outcome);
  
  return {
    success: true,
    newGameState,
    result: {
      choice: selectedChoice,
      outcome,
      message: outcome.description
    }
  };
};

const checkResourceRequirements = (gameState: GameState, choice: any) => {
  const { company } = gameState;
  const required = choice.requiredResources || {};
  
  if (required.cash && company.cash < required.cash) {
    return { success: false, message: `資金が足りません。$${required.cash.toLocaleString()}が必要です。` };
  }
  
  if (required.employees && company.employees < required.employees) {
    return { success: false, message: `従業員が足りません。${required.employees}人が必要です。` };
  }
  
  if (required.researchPoints && gameState.researchPoints < required.researchPoints) {
    return { success: false, message: `研究ポイントが足りません。${required.researchPoints}ptが必要です。` };
  }
  
  if (required.reputation && company.reputation < required.reputation) {
    return { success: false, message: `企業イメージが足りません。${required.reputation}以上が必要です。` };
  }
  
  return { success: true };
};

const determineOutcome = (choice: any) => {
  const random = Math.random();
  
  // Difficulty affects success rate
  let successRate;
  switch (choice.difficulty) {
    case 'easy': successRate = 0.7; break;
    case 'medium': successRate = 0.5; break;
    case 'hard': successRate = 0.3; break;
    default: successRate = 0.5;
  }
  
  if (random < successRate) {
    return choice.potentialOutcomes.success;
  } else if (random < successRate + 0.3) {
    return choice.potentialOutcomes.partial;
  } else {
    return choice.potentialOutcomes.failure;
  }
};

const applyChoiceEffects = (gameState: GameState, choice: any, outcome: any) => {
  let newGameState = { ...gameState };
  
  // Deduct required resources
  const required = choice.requiredResources || {};
  newGameState.company = {
    ...newGameState.company,
    cash: newGameState.company.cash - (required.cash || 0),
    employees: Math.max(1, newGameState.company.employees - (required.employees || 0))
  };
  newGameState.researchPoints = Math.max(0, newGameState.researchPoints - (required.researchPoints || 0));
  
  // Apply outcome effects
  const effects = outcome.effects || {};
  
  newGameState.company = {
    ...newGameState.company,
    cash: Math.max(0, newGameState.company.cash + (effects.cash || 0)),
    employees: Math.max(1, newGameState.company.employees + (effects.employees || 0)),
    reputation: Math.max(0, Math.min(100, newGameState.company.reputation + (effects.reputation || 0))),
    marketCap: Math.max(0, newGameState.company.marketCap + (effects.marketCap || 0))
  };
  
  newGameState.researchPoints = Math.max(0, newGameState.researchPoints + (effects.researchPoints || 0));
  
  if (effects.happiness) {
    const totalHappyPeople = newGameState.regions.reduce((sum, region) => 
      sum + (region.population * region.happinessLevel / 100), 0
    );
    const newTotalHappyPeople = totalHappyPeople + effects.happiness;
    const totalPopulation = newGameState.regions.reduce((sum, region) => sum + region.population, 0);
    newGameState.globalHappiness = Math.min(100, Math.round(newTotalHappyPeople / totalPopulation * 100));
  }
  
  // Add new products if any
  if (effects.newProducts && effects.newProducts.length > 0) {
    effects.newProducts.forEach((productName: string) => {
      const newProduct: Product = {
        id: `product-${Date.now()}-${Math.random()}`,
        name: productName,
        category: ProductCategory.EDUCATION,
        developmentCost: 500000,
        developmentTime: 1,
        qualityScore: 85,
        socialImpactScore: 80,
        price: 100,
        isReleased: true
      };
      newGameState.products.push(newProduct);
    });
  }
  
  // Update story progress
  newGameState.storyProgress = {
    ...newGameState.storyProgress,
    totalTurns: newGameState.storyProgress.totalTurns + 1,
    completedActions: [...newGameState.storyProgress.completedActions, choice.title],
    currentSituation: outcome.nextTurnDescription
  };
  
  // Generate next turn
  newGameState.currentTurn = generateNewTurn(newGameState);
  
  // Advance quarter occasionally
  if (newGameState.storyProgress.totalTurns % 3 === 0) {
    newGameState = advanceQuarter(newGameState);
  }
  
  return newGameState;
};

export const switchGameMode = (gameState: GameState, mode: 'dashboard' | 'story'): GameState => {
  return {
    ...gameState,
    gameMode: mode
  };
};