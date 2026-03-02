import React from 'react';
import { Transaction } from '../types';
import { cn, formatCurrency } from '../utils';
import { format } from 'date-fns';
import { ArrowUpRight, ArrowDownLeft, TrendingUp, Bitcoin } from 'lucide-react';

interface ActivityViewProps {
  transactions: Transaction[];
}

export const ActivityView: React.FC<ActivityViewProps> = ({ transactions }) => {
  const getIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'send': return <ArrowUpRight className="text-white/60" size={20} />;
      case 'request': return <ArrowDownLeft className="text-cash-green" size={20} />;
      case 'add_cash': return <ArrowDownLeft className="text-cash-green" size={20} />;
      case 'cash_out': return <ArrowUpRight className="text-white/60" size={20} />;
      case 'stock_buy': return <TrendingUp className="text-white/60" size={20} />;
      case 'btc_buy': return <Bitcoin className="text-white/60" size={20} />;
      default: return <ArrowUpRight className="text-white/60" size={20} />;
    }
  };

  const getLabel = (transaction: Transaction) => {
    switch (transaction.type) {
      case 'send': return `Sent to ${transaction.recipient}`;
      case 'request': return `Requested from ${transaction.sender}`;
      case 'add_cash': return 'Added Cash';
      case 'cash_out': return 'Cashed Out';
      case 'stock_buy': return `Bought ${transaction.asset}`;
      case 'btc_buy': return 'Bought Bitcoin';
      default: return 'Transaction';
    }
  };

  return (
    <div className="flex flex-col h-full pt-20 pb-24 px-6 overflow-y-auto no-scrollbar">
      <h2 className="text-2xl font-bold mb-6">Activity</h2>
      
      {transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-white/40">
          <p>No activity yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {transactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).map((tx) => (
            <div key={tx.id} className="flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-active:bg-white/20 transition-colors">
                  {getIcon(tx.type)}
                </div>
                <div>
                  <p className="font-semibold text-white">{getLabel(tx)}</p>
                  <p className="text-sm text-white/40">{format(tx.timestamp, 'MMM d, h:mm a')}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={cn(
                  "font-bold text-lg",
                  tx.type === 'request' || tx.type === 'add_cash' ? "text-cash-green" : "text-white"
                )}>
                  {tx.type === 'request' || tx.type === 'add_cash' ? '+' : '-'}{formatCurrency(tx.amount)}
                </p>
                <p className="text-xs text-white/40 capitalize">{tx.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
