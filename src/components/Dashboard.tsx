import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { ProductCategory, ProductCategoryLabels } from '../types/game';

const Dashboard: React.FC = () => {
  const { gameState, advanceTime, createProduct, expandToMarket, toggleGameMode, message } = useGame();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'business' | 'markets' | 'finance'>('overview');

  const formatCurrency = (amount: number) => {
    if (amount >= 1e12) return `$${(amount / 1e12).toFixed(1)}兆`;
    if (amount >= 1e9) return `$${(amount / 1e9).toFixed(1)}B`;
    if (amount >= 1e6) return `$${(amount / 1e6).toFixed(1)}M`;
    if (amount >= 1e3) return `$${(amount / 1e3).toFixed(1)}K`;
    return `$${amount.toFixed(0)}`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(1)}億人`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}万人`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}千人`;
    return `${num}人`;
  };

  const totalHappyPeople = gameState.regions.reduce((sum, region) => 
    sum + (region.population * region.happinessLevel / 100), 0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-gray-900">{gameState.company.name}</h1>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">時価総額:</span>
                  <span className="font-semibold text-green-600">{formatCurrency(gameState.company.marketCap)}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">幸せな人々:</span>
                  <span className="font-semibold text-blue-600">{formatNumber(totalHappyPeople)}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">資金:</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(gameState.company.cash)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Q{gameState.currentQuarter} {gameState.currentYear}
              </span>
              <button
                onClick={toggleGameMode}
                className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
              >
                ストーリーモード
              </button>
              <button
                onClick={advanceTime}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                次の四半期
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Message Bar */}
      {message && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-blue-700">{message}</p>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: '概要' },
              { id: 'business', label: '事業' },
              { id: 'markets', label: '市場' },
              { id: 'finance', label: '財務' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Company Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">会社統計</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">従業員数:</span>
                  <span className="font-medium">{gameState.company.employees.toLocaleString()}人</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">売上:</span>
                  <span className="font-medium">{formatCurrency(gameState.company.revenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">利益:</span>
                  <span className="font-medium">{formatCurrency(gameState.company.profit)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">企業イメージ:</span>
                  <span className="font-medium">{gameState.company.reputation}/100</span>
                </div>
              </div>
            </div>

            {/* Global Impact */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">世界への影響</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">幸せな人々:</span>
                  <span className="font-medium text-blue-600">{formatNumber(totalHappyPeople)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">世界幸福度:</span>
                  <span className="font-medium">{gameState.globalHappiness}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">製品数:</span>
                  <span className="font-medium">{gameState.products.length}個</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">研究ポイント:</span>
                  <span className="font-medium">{gameState.researchPoints}pt</span>
                </div>
              </div>
            </div>

            {/* Top Regions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Regional Performance</h3>
              <div className="space-y-3">
                {gameState.regions
                  .sort((a, b) => b.happinessLevel - a.happinessLevel)
                  .slice(0, 3)
                  .map(region => (
                    <div key={region.id} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-sm">{region.name}</div>
                        <div className="text-xs text-gray-500">
                          {formatNumber(region.population)} people
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sm">{region.happinessLevel}%</div>
                        <div className="text-xs text-gray-500">
                          {region.marketPenetration}% market
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'business' && (
          <div className="space-y-6">
            {/* Product Development */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">製品開発</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.values(ProductCategory).map(category => (
                  <button
                    key={category}
                    onClick={() => createProduct(`新しい${ProductCategoryLabels[category]}製品`, category, 'medium')}
                    className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <div className="text-center">
                      <div className="font-medium">{ProductCategoryLabels[category]}</div>
                      <div className="text-sm text-gray-500 mt-1">$200K 投資</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Current Products */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">現在の製品</h3>
              {gameState.products.length === 0 ? (
                <p className="text-gray-500 text-center py-8">まだ製品がありません。最初の製品を開発しましょう！</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {gameState.products.map(product => (
                    <div key={product.id} className="border rounded-lg p-4">
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-gray-600">{ProductCategoryLabels[product.category]}</p>
                      <div className="mt-2 space-y-1 text-xs">
                        <div>品質: {product.qualityScore}/100</div>
                        <div>社会的インパクト: {product.socialImpactScore}/100</div>
                        <div>状態: {product.isReleased ? 'リリース済み' : '開発中'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {selectedTab === 'markets' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">世界市場</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gameState.regions.map(region => (
                <div key={region.id} className="border rounded-lg p-4">
                  <h4 className="font-medium text-lg">{region.name}</h4>
                  <div className="mt-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Population:</span>
                      <span>{formatNumber(region.population)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Happiness:</span>
                      <span>{region.happinessLevel}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Market Share:</span>
                      <span>{region.marketPenetration}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GDP per Capita:</span>
                      <span>{formatCurrency(region.gdpPerCapita)}</span>
                    </div>
                  </div>
                  {region.marketPenetration < 50 && (
                    <button
                      onClick={() => expandToMarket(region.id, 'moderate')}
                      className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded text-sm hover:bg-green-700 transition-colors"
                    >
                      Expand Here ($500K)
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'finance' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Market Capitalization</span>
                  <span className="text-lg font-bold text-green-600">
                    {formatCurrency(gameState.company.marketCap)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Cash on Hand</span>
                  <span className="font-medium">{formatCurrency(gameState.company.cash)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Total Revenue</span>
                  <span className="font-medium">{formatCurrency(gameState.company.revenue)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>Total Profit</span>
                  <span className={`font-medium ${gameState.company.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(gameState.company.profit)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Competition</h3>
              <div className="space-y-4">
                {gameState.competitors.map((competitor, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <div className="font-medium">{competitor.name}</div>
                      <div className="text-sm text-gray-600">
                        Reputation: {competitor.reputation}/100
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{formatCurrency(competitor.marketCap)}</div>
                      <div className="text-sm text-gray-600">
                        {competitor.employees.toLocaleString()} employees
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;