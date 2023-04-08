import {ListingTypeEnum} from "../orders/listing-type-enum";

export interface Listing{
  id: number,
  listingType: ListingTypeEnum,
  symbol: string,
  quantity: number
}

export interface ListingSum{
  listingType: ListingTypeEnum,
  quantity: number
}
