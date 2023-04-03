import {ListingTypeEnum} from "./listing-type-enum";
import {OrderActionEnum} from "./order-action-enum";
import {OrderTypeEnum} from "./order-type-enum";

export class MakeOrderRequest{
  symbol: string;
  listingType: ListingTypeEnum;
  quantity: number;
  orderAction: OrderActionEnum;
  orderType: OrderTypeEnum;
  limitValue: number;
  stopValue: number;
  allOrNoneFlag: boolean;
  marginFlag: boolean;

  constructor(symbol: string, listingType: ListingTypeEnum, quantity: number, orderAction: OrderActionEnum, orderType: OrderTypeEnum, limitValue: number, stopValue: number, allOrNoneFlag: boolean, marginFlag: boolean) {
    this.symbol = symbol;
    this.listingType = listingType;
    this.quantity = quantity;
    this.orderAction = orderAction;
    this.orderType = orderType;
    this.limitValue = limitValue;
    this.stopValue = stopValue;
    this.allOrNoneFlag = allOrNoneFlag;
    this.marginFlag = marginFlag;
  }
}
