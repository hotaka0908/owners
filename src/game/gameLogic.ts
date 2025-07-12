import { GameState, Company, Region, Product, ProductCategory, GameEvent } from '../types/game';

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
      name: 'North America',
      population: 579000000,
      happinessLevel: 65,
      marketPenetration: 0,
      gdpPerCapita: 65000
    },
    {
      id: 'europe',
      name: 'Europe',
      population: 748000000,
      happinessLevel: 70,
      marketPenetration: 0,
      gdpPerCapita: 45000
    },
    {
      id: 'asia',
      name: 'Asia',
      population: 4641000000,
      happinessLevel: 55,
      marketPenetration: 0,
      gdpPerCapita: 15000
    },
    {
      id: 'africa',
      name: 'Africa',
      population: 1340000000,
      happinessLevel: 45,
      marketPenetration: 0,
      gdpPerCapita: 4000
    },
    {
      id: 'south-america',
      name: 'South America',
      population: 434000000,
      happinessLevel: 50,
      marketPenetration: 0,
      gdpPerCapita: 8000
    },
    {
      id: 'oceania',
      name: 'Oceania',
      population: 46000000,
      happinessLevel: 75,
      marketPenetration: 0,
      gdpPerCapita: 55000
    }
  ];

  return {
    company: initialCompany,
    regions: initialRegions,
    products: [],
    currentQuarter: 1,
    currentYear: 2025,
    globalHappiness: calculateGlobalHappiness(initialRegions),
    competitors: generateInitialCompetitors(),
    researchPoints: 10,
    events: []
  };
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