export type WalletsType = {
  balance: number;
  created_at: string;
  first_name: string;
  id: string;
  inflow: number;
  last_name: string;
  outflow: number;
  tag: string | null;
  updated_at: string;
  user_id: string;
};

export type TransactionsType = {
  transaction_id: string;
  sender_id: string;
  sender_first_name: string;
  sender_last_name: string;
  receiver_id: string;
  receiver_first_name: string;
  receiver_last_name: string;
  amount: number;
  created_at: string;
  type: string;
  status: string;
};
