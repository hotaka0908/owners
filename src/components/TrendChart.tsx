import React from 'react';

interface TrendChartProps {
  data: { month: string; value: number; happyPeople: number }[];
}

export const TrendChart: React.FC<TrendChartProps> = ({ data }) => {
  if (data.length < 2) return null;

  const formatCurrency = (amount: number): string => {
    if (amount >= 1e12) return `$${(amount / 1e12).toFixed(1)}兆`;
    if (amount >= 1e9) return `$${(amount / 1e9).toFixed(1)}B`;
    if (amount >= 1e6) return `$${(amount / 1e6).toFixed(1)}M`;
    return `$${(amount / 1e3).toFixed(1)}K`;
  };

  const formatPeople = (count: number): string => {
    if (count >= 1e8) return `${(count / 1e8).toFixed(1)}億人`;
    if (count >= 1e4) return `${(count / 1e4).toFixed(1)}万人`;
    return `${Math.round(count).toLocaleString()}人`;
  };

  // データの最大値と最小値を取得
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const maxPeople = Math.max(...data.map(d => d.happyPeople));

  // SVGのサイズ設定
  const width = 800;
  const height = 300;
  const padding = 60;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // データポイントを座標に変換
  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * chartWidth;
    const y = padding + (1 - (d.value - minValue) / (maxValue - minValue)) * chartHeight;
    return { x, y, ...d };
  });

  // SVGパス文字列を生成
  const pathData = points.reduce((path, point, i) => {
    const command = i === 0 ? 'M' : 'L';
    return `${path} ${command} ${point.x} ${point.y}`;
  }, '');

  // グラデーション用のエリアパス
  const areaPath = pathData + ` L ${points[points.length - 1].x} ${padding + chartHeight} L ${padding} ${padding + chartHeight} Z`;

  const currentValue = data[data.length - 1]?.value || 0;
  const previousValue = data[data.length - 2]?.value || 0;
  const trend = currentValue > previousValue ? 'up' : currentValue < previousValue ? 'down' : 'neutral';

  return (
    <div className="w-full">
      {/* Chart Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-900">時価総額の推移</h4>
          <p className="text-sm text-gray-600">直近の企業価値変動</p>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-2">
            <span className={`text-2xl ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-400'}`}>
              {trend === 'up' ? '📈' : trend === 'down' ? '📉' : '➡️'}
            </span>
            <div>
              <div className="text-lg font-bold text-gray-900">
                {formatCurrency(currentValue)}
              </div>
              <div className="text-sm text-gray-500">
                {formatPeople(data[data.length - 1]?.happyPeople || 0)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4">
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
          {/* Grid lines */}
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          
          {/* Y-axis grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
            <g key={i}>
              <line
                x1={padding}
                y1={padding + ratio * chartHeight}
                x2={padding + chartWidth}
                y2={padding + ratio * chartHeight}
                stroke="#E5E7EB"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
              <text
                x={padding - 10}
                y={padding + ratio * chartHeight}
                textAnchor="end"
                alignmentBaseline="middle"
                className="text-xs fill-gray-500"
              >
                {formatCurrency(maxValue - ratio * (maxValue - minValue))}
              </text>
            </g>
          ))}

          {/* Area fill */}
          <path
            d={areaPath}
            fill="url(#chartGradient)"
          />

          {/* Main line */}
          <path
            d={pathData}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {points.map((point, i) => (
            <g key={i}>
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#FFFFFF"
                stroke="#3B82F6"
                strokeWidth="2"
              />
              {/* Tooltip on hover */}
              <circle
                cx={point.x}
                cy={point.y}
                r="12"
                fill="transparent"
                className="hover:fill-blue-100 hover:fill-opacity-50 cursor-pointer"
                title={`${point.month}: ${formatCurrency(point.value)}`}
              />
            </g>
          ))}

          {/* X-axis labels */}
          {points.map((point, i) => (
            <text
              key={i}
              x={point.x}
              y={padding + chartHeight + 20}
              textAnchor="middle"
              className="text-xs fill-gray-500"
            >
              {point.month}
            </text>
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex justify-center items-center space-x-6 mt-4 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>時価総額</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>成長トレンド</span>
        </div>
      </div>
    </div>
  );
};