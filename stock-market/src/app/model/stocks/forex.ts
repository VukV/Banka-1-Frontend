export interface Forex{
  id: number,
  lastRefresh: string,
  fromCurrency: Currency,
  toCurrency: Currency,
  exchangeRate: number,
  symbol: string,
  bidPrice: number,
  askPrice: number
}

export interface Currency{
  id: number,
  currencyName: string,
  currencyCode: string,
  currencySymbol: string,
  polity: string
}
