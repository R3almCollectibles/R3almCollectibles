import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Calendar, DollarSign } from 'lucide-react';

interface ChartDataPoint {
  date: string;
  value: number;
  change: number;
}

const PortfolioChart = () => {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // Mock portfolio data for different timeframes
  const chartData: Record<string, ChartDataPoint[]> = {
    '7d': [
      { date: '2024-01-22', value: 45.2, change: 0 },
      { date: '2024-01-23', value: 46.1, change: 1.99 },
      { date: '2024-01-24', value: 45.8, change: -0.65 },
      { date: '2024-01-25', value: 47.2, change: 3.05 },
      { date: '2024-01-26', value: 46.9, change: -0.64 },
      { date: '2024-01-27', value: 47.5, change: 1.28 },
      { date: '2024-01-28', value: 47.85, change: 0.74 }
    ],
    '30d': [
      { date: '2023-12-29', value: 42.1, change: 0 },
      { date: '2024-01-05', value: 43.2, change: 2.61 },
      { date: '2024-01-12', value: 44.8, change: 3.70 },
      { date: '2024-01-19', value: 46.2, change: 3.13 },
      { date: '2024-01-26', value: 47.1, change: 1.95 },
      { date: '2024-01-28', value: 47.85, change: 1.59 }
    ],
    '90d': [
      { date: '2023-11-01', value: 38.5, change: 0 },
      { date: '2023-11-15', value: 39.8, change: 3.38 },
      { date: '2023-12-01', value: 41.2, change: 3.52 },
      { date: '2023-12-15', value: 42.9, change: 4.13 },
      { date: '2024-01-01', value: 44.1, change: 2.80 },
      { date: '2024-01-15', value: 46.3, change: 4.99 },
      { date: '2024-01-28', value: 47.85, change: 3.35 }
    ],
    '1y': [
      { date: '2023-02-01', value: 32.1, change: 0 },
      { date: '2023-04-01', value: 34.5, change: 7.48 },
      { date: '2023-06-01', value: 36.8, change: 6.67 },
      { date: '2023-08-01', value: 39.2, change: 6.52 },
      { date: '2023-10-01', value: 41.7, change: 6.38 },
      { date: '2023-12-01', value: 44.2, change: 5.99 },
      { date: '2024-01-28', value: 47.85, change: 8.26 }
    ]
  };

  const currentData = chartData[timeframe];
  const latestValue = currentData[currentData.length - 1];
  const firstValue = currentData[0];
  const totalChange = ((latestValue.value - firstValue.value) / firstValue.value) * 100;
  const isPositive = totalChange >= 0;

  // Calculate chart dimensions and scaling
  const chartWidth = 600;
  const chartHeight = 200;
  const padding = 20;
  const innerWidth = chartWidth - padding * 2;
  const innerHeight = chartHeight - padding * 2;

  const minValue = Math.min(...currentData.map(d => d.value));
  const maxValue = Math.max(...currentData.map(d => d.value));
  const valueRange = maxValue - minValue;

  // Create SVG path for the line chart
  const createPath = (data: ChartDataPoint[]) => {
    return data.map((point, index) => {
      const x = padding + (index / (data.length - 1)) * innerWidth;
      const y = padding + ((maxValue - point.value) / valueRange) * innerHeight;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  // Create area path for gradient fill
  const createAreaPath = (data: ChartDataPoint[]) => {
    const linePath = createPath(data);
    const lastPoint = data[data.length - 1];
    const lastX = padding + innerWidth;
    const bottomY = padding + innerHeight;
    const firstX = padding;
    
    return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  };

  const timeframeLabels = {
    '7d': '7 Days',
    '30d': '30 Days',
    '90d': '90 Days',
    '1y': '1 Year'
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Portfolio Performance</h3>
        <div className="flex items-center space-x-2">
          {Object.entries(timeframeLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTimeframe(key as any)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                timeframe === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:text-white hover:bg-gray-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Value and Change */}
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <div>
            <div className="text-3xl font-bold text-white">{latestValue.value} ETH</div>
            <div className="text-gray-400 text-sm">Total Portfolio Value</div>
          </div>
          <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? (
              <TrendingUp className="h-5 w-5" />
            ) : (
              <TrendingDown className="h-5 w-5" />
            )}
            <span className="font-semibold">
              {isPositive ? '+' : ''}{totalChange.toFixed(2)}%
            </span>
            <span className="text-gray-400 text-sm">
              ({timeframeLabels[timeframe]})
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative">
        <svg
          width={chartWidth}
          height={chartHeight}
          className="w-full h-auto"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        >
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="portfolioGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity="0.3" />
              <stop offset="100%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
            <line
              key={ratio}
              x1={padding}
              y1={padding + ratio * innerHeight}
              x2={padding + innerWidth}
              y2={padding + ratio * innerHeight}
              stroke="#374151"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          ))}

          {/* Area fill */}
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            d={createAreaPath(currentData)}
            fill="url(#portfolioGradient)"
          />

          {/* Main line */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            d={createPath(currentData)}
            fill="none"
            stroke={isPositive ? "#10B981" : "#EF4444"}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {currentData.map((point, index) => {
            const x = padding + (index / (currentData.length - 1)) * innerWidth;
            const y = padding + ((maxValue - point.value) / valueRange) * innerHeight;
            
            return (
              <motion.circle
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                cx={x}
                cy={y}
                r="4"
                fill={isPositive ? "#10B981" : "#EF4444"}
                stroke="#1F2937"
                strokeWidth="2"
                className="hover:r-6 transition-all cursor-pointer"
              />
            );
          })}
        </svg>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 -ml-12">
          <span>{maxValue.toFixed(1)} ETH</span>
          <span>{((maxValue + minValue) / 2).toFixed(1)} ETH</span>
          <span>{minValue.toFixed(1)} ETH</span>
        </div>
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between mt-4 text-xs text-gray-400">
        {currentData.map((point, index) => {
          if (index === 0 || index === currentData.length - 1 || index === Math.floor(currentData.length / 2)) {
            return (
              <span key={index}>
                {new Date(point.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
            );
          }
          return null;
        })}
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-700">
        <div className="text-center">
          <div className="text-lg font-semibold text-white">
            {((latestValue.value - firstValue.value)).toFixed(2)} ETH
          </div>
          <div className="text-gray-400 text-sm">Net Change</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-white">
            {Math.max(...currentData.map(d => d.value)).toFixed(2)} ETH
          </div>
          <div className="text-gray-400 text-sm">Period High</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-white">
            {Math.min(...currentData.map(d => d.value)).toFixed(2)} ETH
          </div>
          <div className="text-gray-400 text-sm">Period Low</div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioChart;