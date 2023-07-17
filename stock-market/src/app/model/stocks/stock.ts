import {ListingTypeEnum} from "../orders/listing-type-enum";
import {OptionTypeEnum} from "./option-type-enum";

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

export interface Option {
  id: number,
  listingType: ListingTypeEnum,
  symbol: string,
  strike: number,
  optionType: OptionTypeEnum,
  expirationDate: Date,
  ask: number,
  bid: number,
  price: number,
  openInterest: number
}
