import React from 'react';
import { Delete } from 'lucide-react';
import { cn } from '../utils';

interface KeypadProps {
  onNumberClick: (num: string) => void;
  onDelete: () => void;
  onDecimal: () => void;
}

export const Keypad: React.FC<KeypadProps> = ({ onNumberClick, onDelete, onDecimal }) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'delete'];

  return (
    <div className="grid grid-cols-3 gap-y-8 gap-x-12 w-full max-w-xs mx-auto mt-8">
      {keys.map((key) => (
        <button
          key={key}
          onClick={() => {
            if (key === 'delete') onDelete();
            else if (key === '.') onDecimal();
            else onNumberClick(key);
          }}
          className={cn(
            "flex items-center justify-center text-3xl font-medium h-16 w-16 rounded-full transition-all active:bg-white/10 active:scale-90",
            key === 'delete' ? "text-white/60" : "text-white"
          )}
        >
          {key === 'delete' ? <Delete size={28} /> : key}
        </button>
      ))}
    </div>
  );
};
