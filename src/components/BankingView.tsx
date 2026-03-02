import React from 'react';
import { formatCurrency } from '../utils';
import { ArrowDownLeft, ArrowUpRight, Landmark, CreditCard, Gift, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface BankingViewProps {
  balance: number;
  onAddCash: () => void;
  onCashOut: () => void;
}

export const BankingView: React.FC<BankingViewProps> = ({ balance, onAddCash, onCashOut }) => {
  const menuItems = [
    { icon: Landmark, label: 'Linked Accounts', color: 'text-blue-400' },
    { icon: CreditCard, label: 'Direct Deposit', color: 'text-purple-400' },
    { icon: Gift, label: 'Referrals', color: 'text-pink-400' },
    { icon: ShieldCheck, label: 'Security', color: 'text-green-400' },
  ];

  return (
    <div className="flex flex-col h-full pt-20 pb-24 px-6 overflow-y-auto no-scrollbar">
      <div className="flex flex-col items-center py-12">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/60 text-lg mb-2"
        >
          Cash Balance
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-6xl font-bold text-cash-green"
        >
          {formatCurrency(balance)}
        </motion.h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-12">
        <button
          onClick={onAddCash}
          className="flex items-center justify-center gap-2 bg-white/10 py-4 rounded-2xl font-bold text-lg active:scale-95 transition-all"
        >
          <ArrowDownLeft size={20} className="text-cash-green" />
          Add Cash
        </button>
        <button
          onClick={onCashOut}
          className="flex items-center justify-center gap-2 bg-white/10 py-4 rounded-2xl font-bold text-lg active:scale-95 transition-all"
        >
          <ArrowUpRight size={20} className="text-white/60" />
          Cash Out
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-white/40 text-sm font-bold uppercase tracking-widest px-2">Banking</h3>
        <div className="bg-white/5 rounded-3xl overflow-hidden">
          {menuItems.map((item, idx) => (
            <button
              key={item.label}
              className={`w-full flex items-center justify-between px-6 py-5 active:bg-white/10 transition-colors ${
                idx !== menuItems.length - 1 ? 'border-b border-white/5' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon size={24} className={item.color} />
                <span className="font-semibold text-lg">{item.label}</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-white/20" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
