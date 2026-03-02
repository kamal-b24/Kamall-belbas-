import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, formatCurrency } from '../utils';
import { Delete } from 'lucide-react';

interface PayViewProps {
  onSend: (amount: number, note: string, recipient: string) => void;
  onRequest: (amount: number, note: string, recipient: string) => void;
}

export const PayView: React.FC<PayViewProps> = ({ onSend, onRequest }) => {
  const [amount, setAmount] = useState('0');
  const [note, setNote] = useState('');
  const [recipient, setRecipient] = useState('');

  const handleNumberClick = (num: string) => {
    if (amount === '0') setAmount(num);
    else if (amount.includes('.') && amount.split('.')[1].length >= 2) return;
    else setAmount(amount + num);
  };

  const handleDelete = () => {
    if (amount.length === 1) setAmount('0');
    else setAmount(amount.slice(0, -1));
  };

  const handleDecimal = () => {
    if (!amount.includes('.')) setAmount(amount + '.');
  };

  const numericAmount = parseFloat(amount);

  return (
    <div className="flex flex-col items-center justify-center h-full pt-24 pb-32 px-6 bg-cash-green text-black">
      <div className="flex flex-col items-center mb-auto w-full">
        <div className="w-full max-w-xs mb-8">
          <div className="flex items-center gap-2 border-b border-black/10 py-2">
            <span className="font-bold text-lg">To:</span>
            <input
              type="text"
              placeholder="Name, $Cashtag, Phone, Email"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="bg-transparent flex-1 focus:outline-none text-lg placeholder:text-black/30 font-medium"
            />
          </div>
        </div>

        <motion.div
          key={amount}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-8xl font-bold mb-4"
        >
          ${amount}
        </motion.div>
        
        <input
          type="text"
          placeholder="Add a note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="bg-transparent text-center text-black/60 placeholder:text-black/30 focus:outline-none text-xl w-full max-w-xs font-medium"
        />
      </div>

      <div className="grid grid-cols-3 gap-y-8 gap-x-12 w-full max-w-xs mx-auto mt-8">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'delete'].map((key) => (
          <button
            key={key}
            onClick={() => {
              if (key === 'delete') handleDelete();
              else if (key === '.') handleDecimal();
              else handleNumberClick(key);
            }}
            className={cn(
              "flex items-center justify-center text-3xl font-bold h-16 w-16 rounded-full transition-all active:bg-black/10 active:scale-90",
              key === 'delete' ? "text-black/60" : "text-black"
            )}
          >
            {key === 'delete' ? <Delete size={28} /> : key}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-xs mt-12">
        <button
          onClick={() => onRequest(numericAmount, note, recipient)}
          disabled={numericAmount === 0 || !recipient}
          className={cn(
            "py-4 rounded-full font-bold text-lg transition-all active:scale-95",
            (numericAmount > 0 && recipient) ? "bg-black text-white" : "bg-black/10 text-black/20"
          )}
        >
          Request
        </button>
        <button
          onClick={() => onSend(numericAmount, note, recipient)}
          disabled={numericAmount === 0 || !recipient}
          className={cn(
            "py-4 rounded-full font-bold text-lg transition-all active:scale-95",
            (numericAmount > 0 && recipient) ? "bg-white text-black" : "bg-white/30 text-black/20"
          )}
        >
          Pay
        </button>
      </div>
    </div>
  );
};
