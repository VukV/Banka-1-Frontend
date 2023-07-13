export interface ExchangeModel{
  id: string,
  senderId: string,
  senderAccountNumber: string,
  receiverAccountNumber: string,
  exchangePairSymbol: string,
  conversionTime: string,
  amount: string,
  convertedAmount: string,
  exchangeRate: string,
  commissionFee: string
}
