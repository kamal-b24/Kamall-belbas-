import { useState, useEffect } from 'react';
import { AppTab, UserState, Transaction } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { PayView } from './components/PayView';
import { ActivityView } from './components/ActivityView';
import { BankingView } from './components/BankingView';
import { CardView } from './components/CardView';
import { InvestingView } from './components/InvestingView';
import { ConfirmationModal } from './components/ConfirmationModal';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './utils';

const INITIAL_STATE: UserState = {
  balance: 1250.00,
  btcBalance: 0.0245,
  stockBalance: 1240.50,
  cashtag: '$CashUser',
  transactions: [
    {
      id: '1',
      type: 'send',
      amount: 45.00,
      recipient: 'Alex Rivera',
      status: 'completed',
      timestamp: new Date(Date.now() - 3600000 * 2),
      note: 'Dinner 🍕'
    },
    {
      id: '2',
      type: 'request',
      amount: 20.00,
      sender: 'Sarah Jenkins',
      status: 'completed',
      timestamp: new Date(Date.now() - 3600000 * 24),
      note: 'Coffee ☕️'
    },
    {
      id: '3',
      type: 'add_cash',
      amount: 500.00,
      status: 'completed',
      timestamp: new Date(Date.now() - 3600000 * 48),
    }
  ]
};

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('pay');
  const [userState, setUserState] = useState<UserState>(INITIAL_STATE);
  const [confirmData, setConfirmData] = useState<{
    isOpen: boolean;
    amount: number;
    note: string;
    recipient: string;
    type: 'send' | 'request';
  }>({
    isOpen: false,
    amount: 0,
    note: '',
    recipient: '',
    type: 'send'
  });

  const handleSend = (amount: number, note: string, recipient: string) => {
    if (amount <= 0 || amount > userState.balance) return;
    setConfirmData({ isOpen: true, amount, note, recipient, type: 'send' });
  };

  const handleRequest = (amount: number, note: string, recipient: string) => {
    if (amount <= 0) return;
    setConfirmData({ isOpen: true, amount, note, recipient, type: 'request' });
  };

  const [isProcessing, setIsProcessing] = useState(false);

  const executeTransaction = async () => {
    const { amount, note, recipient, type } = confirmData;
    setIsProcessing(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (type === 'send') {
      const newTx: Transaction = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'send',
        amount,
        recipient,
        status: 'completed',
        timestamp: new Date(),
        note
      };

      setUserState(prev => ({
        ...prev,
        balance: prev.balance - amount,
        transactions: [newTx, ...prev.transactions]
      }));
    } else {
      const newTx: Transaction = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'request',
        amount,
        sender: recipient,
        status: 'pending',
        timestamp: new Date(),
        note
      };

      setUserState(prev => ({
        ...prev,
        transactions: [newTx, ...prev.transactions]
      }));
    }
    
    setIsProcessing(false);
    setConfirmData(prev => ({ ...prev, isOpen: false }));
    setActiveTab('activity');
  };

  const handleAddCash = () => {
    const amount = 100.00;
    const newTx: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'add_cash',
      amount,
      status: 'completed',
      timestamp: new Date(),
    };

    setUserState(prev => ({
      ...prev,
      balance: prev.balance + amount,
      transactions: [newTx, ...prev.transactions]
    }));
  };

  const handleCashOut = () => {
    const amount = userState.balance;
    if (amount <= 0) return;

    const newTx: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'cash_out',
      amount,
      status: 'completed',
      timestamp: new Date(),
    };

    setUserState(prev => ({
      ...prev,
      balance: 0,
      transactions: [newTx, ...prev.transactions]
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'pay':
        return <PayView onSend={handleSend} onRequest={handleRequest} />;
      case 'activity':
        return <ActivityView transactions={userState.transactions} />;
      case 'banking':
        return <BankingView balance={userState.balance} onAddCash={handleAddCash} onCashOut={handleCashOut} />;
      case 'card':
        return <CardView />;
      case 'investing':
        return <InvestingView />;
      default:
        return null;
    }
  };

  const isGreen = activeTab === 'pay';

  return (
    <div className={cn(
      "h-screen w-full flex flex-col relative overflow-hidden transition-colors duration-300",
      isGreen ? "bg-cash-green" : "bg-black"
    )}>
      <Header 
        title={isGreen ? undefined : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} 
        isGreen={isGreen}
      />
      
      <main className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="h-full w-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      <ConfirmationModal
        isOpen={confirmData.isOpen}
        onClose={() => setConfirmData(prev => ({ ...prev, isOpen: false }))}
        onConfirm={executeTransaction}
        amount={confirmData.amount}
        recipient={confirmData.recipient}
        type={confirmData.type}
        isProcessing={isProcessing}
      />
    </div>
  );
}
