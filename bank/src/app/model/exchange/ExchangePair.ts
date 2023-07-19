export interface ExchangePair {
  exchangePairSymbol: string;
  exchangeRate: number;
}

export interface ExchangeHistory {
  exchangePairSymbol: string;
  amount: number;
  exchangeRate: number;
}
