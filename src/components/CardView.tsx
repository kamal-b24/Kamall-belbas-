import React from 'react';
import { motion } from 'motion/react';
import { CreditCard, Shield, Lock, Eye, EyeOff } from 'lucide-react';

export const CardView: React.FC = () => {
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <div className="flex flex-col h-full pt-20 pb-24 px-6 overflow-y-auto no-scrollbar">
      <h2 className="text-2xl font-bold mb-8">Cash Card</h2>

      <div className="relative mb-12">
        <motion.div
          layout
          className="aspect-[1.586/1] w-full bg-zinc-900 rounded-3xl p-8 flex flex-col justify-between shadow-2xl border border-white/5 relative overflow-hidden"
        >
          {/* Card Design Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-cash-green/10 blur-3xl rounded-full -mr-16 -mt-16" />
          
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <CreditCard size={24} className="text-cash-green" />
            </div>
            <div className="text-right">
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Cash App</p>
              <p className="text-cash-green font-bold italic">VISA</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4 items-center">
              <p className="text-2xl font-mono tracking-widest">
                {showDetails ? '4532 1234 5678 9012' : '•••• •••• •••• 9012'}
              </p>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-white/40 text-[10px] uppercase font-bold mb-1">Card Holder</p>
                <p className="font-semibold tracking-wide">CASH USER</p>
              </div>
              <div className="text-right">
                <p className="text-white/40 text-[10px] uppercase font-bold mb-1">Expires</p>
                <p className="font-semibold">12/28</p>
              </div>
            </div>
          </div>
        </motion.div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-xl active:scale-95 transition-all"
        >
          {showDetails ? <EyeOff size={18} /> : <Eye size={18} />}
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>

      <div className="space-y-6 mt-12">
        <div className="flex items-center justify-between p-6 bg-white/5 rounded-3xl cursor-pointer active:bg-white/10 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Shield size={20} className="text-blue-400" />
            </div>
            <div>
              <p className="font-bold">Card Security</p>
              <p className="text-sm text-white/40">Manage limits and PIN</p>
            </div>
          </div>
          <div className="w-12 h-6 bg-white/10 rounded-full relative">
             <div className="absolute right-1 top-1 w-4 h-4 bg-cash-green rounded-full" />
          </div>
        </div>

        <div className="flex items-center justify-between p-6 bg-white/5 rounded-3xl cursor-pointer active:bg-white/10 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
              <Lock size={20} className="text-red-400" />
            </div>
            <div>
              <p className="font-bold">Lock Card</p>
              <p className="text-sm text-white/40">Instantly disable your card</p>
            </div>
          </div>
          <div className="w-12 h-6 bg-white/10 rounded-full relative">
             <div className="absolute left-1 top-1 w-4 h-4 bg-white/40 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
