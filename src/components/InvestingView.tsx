import React, { useState, useMemo } from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from 'recharts';
import { TrendingUp, Bitcoin, ChevronRight, Search, PieChart } from 'lucide-react';
import { cn, formatCurrency } from '../utils';

const generateMockData = (points: number, base: number, volatility: number) => {
  let current = base;
  return Array.from({ length: points }, (_, i) => {
    current = current + (Math.random() - 0.5) * volatility;
    return { time: i, value: current };
  });
};

export const InvestingView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stocks' | 'bitcoin'>('stocks');
  
  const stockData = useMemo(() => generateMockData(20, 150, 10), []);
  const btcData = useMemo(() => generateMockData(20, 65000, 2000), []);

  const currentData = activeTab === 'stocks' ? stockData : btcData;
  const lastValue = currentData[currentData.length - 1].value;
  const firstValue = currentData[0].value;
  const change = lastValue - firstValue;
  const changePercent = (change / firstValue) * 100;

  return (
    <div className="flex flex-col h-full pt-20 pb-24 px-6 overflow-y-auto no-scrollbar">
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('stocks')}
          className={cn(
            "flex-1 py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2",
            activeTab === 'stocks' ? "bg-white text-black" : "bg-white/5 text-white/60"
          )}
        >
          <TrendingUp size={18} />
          Stocks
        </button>
        <button
          onClick={() => setActiveTab('bitcoin')}
          className={cn(
            "flex-1 py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2",
            activeTab === 'bitcoin' ? "bg-white text-black" : "bg-white/5 text-white/60"
          )}
        >
          <Bitcoin size={18} />
          Bitcoin
        </button>
      </div>

      <div className="mb-8">
        <p className="text-white/60 text-sm font-bold uppercase tracking-widest mb-1">
          {activeTab === 'stocks' ? 'Total Investment' : 'Bitcoin Price'}
        </p>
        <h2 className="text-4xl font-bold mb-2">
          {formatCurrency(lastValue)}
        </h2>
        <p className={cn(
          "font-bold flex items-center gap-1",
          change >= 0 ? "text-cash-green" : "text-red-500"
        )}>
          {change >= 0 ? '+' : ''}{formatCurrency(change)} ({changePercent.toFixed(2)}%)
          <span className="text-white/40 font-normal ml-1">Today</span>
        </p>
      </div>

      <div className="h-48 w-full mb-12">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={currentData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={change >= 0 ? "#00D632" : "#EF4444"}
              strokeWidth={3}
              dot={false}
              animationDuration={1500}
            />
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-zinc-900 border border-white/10 p-2 rounded-lg shadow-xl">
                      <p className="font-bold text-sm">{formatCurrency(payload[0].value as number)}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">My Portfolio</h3>
          <button className="text-cash-green font-bold text-sm">View All</button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 p-6 rounded-3xl">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
              <PieChart size={20} className="text-blue-400" />
            </div>
            <p className="text-white/40 text-xs font-bold uppercase mb-1">Portfolio</p>
            <p className="text-xl font-bold">{formatCurrency(1240.50)}</p>
          </div>
          <div className="bg-white/5 p-6 rounded-3xl">
            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center mb-4">
              <Bitcoin size={20} className="text-orange-400" />
            </div>
            <p className="text-white/40 text-xs font-bold uppercase mb-1">Bitcoin</p>
            <p className="text-xl font-bold">0.0245 BTC</p>
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-3xl flex items-center justify-between cursor-pointer active:bg-white/10 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Search size={20} />
            </div>
            <p className="font-bold">Discover Stocks</p>
          </div>
          <ChevronRight size={20} className="text-white/20" />
        </div>
      </div>
    </div>
  );
};
