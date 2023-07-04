export interface ForexTimeSeries{
  from_currency: string,
  to_currency: string,
  last_refreshed: string,
  time_series: TimeSeries[]
}

export interface TimeSeries{
  date: string,
  open: number,
  close: number,
  high: number,
  low: number
}
