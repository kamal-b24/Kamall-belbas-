import React from 'react';
import { Home, CreditCard, DollarSign, Clock, TrendingUp } from 'lucide-react';
import { AppTab } from '../types';
import { cn } from '../utils';

interface BottomNavProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const isGreen = activeTab === 'pay';
  const tabs: { id: AppTab; icon: React.ElementType }[] = [
    { id: 'banking', icon: Home },
    { id: 'card', icon: CreditCard },
    { id: 'pay', icon: DollarSign },
    { id: 'activity', icon: Clock },
    { id: 'investing', icon: TrendingUp },
  ];

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 border-t px-6 py-4 flex justify-between items-center z-50 transition-colors duration-300",
      isGreen ? "bg-cash-green border-black/10" : "bg-black border-white/10"
    )}>
      {tabs.map(({ id, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={cn(
            "transition-all duration-200",
            activeTab === id 
              ? (isGreen ? "text-black scale-110" : "text-cash-green scale-110") 
              : (isGreen ? "text-black/40 hover:text-black" : "text-white/40 hover:text-white")
          )}
        >
          <Icon size={24} strokeWidth={2.5} />
        </button>
      ))}
    </div>
  );
};
