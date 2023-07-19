export interface ExchangePair {
  exchangePairSymbol: string;
  exchangeRate: number;
}

export interface ExchangeHistory {
  exchangePairSymbol: string;
  amount: number;
  exchangeRate: number;
}

export interface ExchangeResponse {
  senderAccountNumber: string;
  receiverAccountNumber: string;
  exchangePairSymbol: string;
  amount: number;
  convertedAmount: number;
  exchangeRate: number;
  commissionFee: number;
}
