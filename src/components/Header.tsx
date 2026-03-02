import React from 'react';
import { User, Search } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  isGreen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, showSearch = true, isGreen = false }) => {
  return (
    <div className={cn(
      "flex justify-between items-center px-6 py-4 fixed top-0 left-0 right-0 z-40 transition-colors duration-300",
      isGreen ? "bg-cash-green text-black" : "bg-black text-white"
    )}>
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors",
        isGreen ? "bg-black/10 hover:bg-black/20" : "bg-white/10 hover:bg-white/20"
      )}>
        <User size={20} className={isGreen ? "text-black" : "text-cash-green"} />
      </div>
      
      {title && <h1 className="text-lg font-bold">{title}</h1>}
      
      <div className="flex gap-4">
        {showSearch && (
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors",
            isGreen ? "bg-black/10 hover:bg-black/20" : "bg-white/10 hover:bg-white/20"
          )}>
            <Search size={20} />
          </div>
        )}
      </div>
    </div>
  );
};

import { cn } from '../utils';
