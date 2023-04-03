export interface Stock{
  id: number,
  lastRefresh: string,
  price: number,
  high: number,
  low: number,
  close: number,
  open: number,
  volume: number,
  symbol: string,
  priceChange: number,
  priceChangeInPercentage: number
}
