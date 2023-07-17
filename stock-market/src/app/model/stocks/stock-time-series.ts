export interface StockTimeSeries{
  symbol: string,
  last_refreshed: string,
  time_series: TimeSeries[]
}

export interface TimeSeries{
  date: string,
  open: number,
  high: number,
  low: number,
  close: number,
  volume: number
}
