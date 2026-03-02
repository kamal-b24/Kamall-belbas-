export type TransactionType = 'send' | 'request' | 'cash_out' | 'add_cash' | 'stock_buy' | 'stock_sell' | 'btc_buy' | 'btc_sell';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  recipient?: string;
  sender?: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: Date;
  note?: string;
  asset?: string;
}

export interface UserState {
  balance: number;
  btcBalance: number;
  stockBalance: number;
  transactions: Transaction[];
  cashtag: string;
}

export type AppTab = 'banking' | 'card' | 'pay' | 'activity' | 'investing';
