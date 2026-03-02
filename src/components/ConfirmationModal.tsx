import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X } from 'lucide-react';
import { formatCurrency } from '../utils';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  amount: number;
  recipient: string;
  type: 'send' | 'request';
  isProcessing?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  amount,
  recipient,
  type,
  isProcessing = false
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isProcessing ? onClose : undefined}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-zinc-900 w-full max-w-sm rounded-[32px] p-8 relative overflow-hidden border border-white/10"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-cash-green/20 flex items-center justify-center mb-6 relative">
                {isProcessing ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-10 h-10 border-4 border-cash-green border-t-transparent rounded-full"
                  />
                ) : (
                  <Check size={40} className="text-cash-green" />
                )}
              </div>
              
              <h3 className="text-2xl font-bold mb-2">
                {isProcessing ? 'Processing...' : (type === 'send' ? 'Confirm Payment' : 'Confirm Request')}
              </h3>
              <p className="text-white/60 mb-8">
                {isProcessing 
                  ? 'Please wait while we secure your transaction.'
                  : (type === 'send' 
                    ? `Are you sure you want to send ${formatCurrency(amount)} to ${recipient}?`
                    : `Are you sure you want to request ${formatCurrency(amount)} from ${recipient}?`
                  )
                }
              </p>

              {!isProcessing && (
                <div className="flex flex-col gap-3 w-full">
                  <button
                    onClick={onConfirm}
                    className="w-full py-4 bg-cash-green text-black rounded-full font-bold text-lg active:scale-95 transition-all"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full py-4 bg-white/10 text-white rounded-full font-bold text-lg active:scale-95 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
