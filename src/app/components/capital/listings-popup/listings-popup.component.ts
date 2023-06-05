import {Component, OnInit, ViewChild} from '@angular/core';
import {Listing} from "../../../model/capital/listing";
import {StocksService} from "../../../services/stocks/stocks.service";
import {PopupComponent} from "../../popup/popup/popup.component";
import {ListingTypeEnum} from "../../../model/orders/listing-type-enum";
import {ForexService} from "../../../services/stocks/forex.service";

@Component({
  selector: 'app-listings-popup',
  templateUrl: './listings-popup.component.html',
  styleUrls: ['./listings-popup.component.css']
})
export class ListingsPopupComponent implements OnInit{

  displayStyle: string = "none"
  listings: Listing[] = [];
  listingType: ListingTypeEnum = ListingTypeEnum.STOCK;

  loading: boolean = false;

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  constructor(private stocksService: StocksService, private forexService: ForexService) {
  }

  ngOnInit(): void { }

  openPopUp(listings: Listing[], listingType: ListingTypeEnum): void{
    this.listings = listings;
    this.listingType = listingType;
    this.displayStyle = "block"
    this.getListingPrices();
  }

  closePopUp(): void{
    this.displayStyle = "none"
  }

  getListingPrices(){
    this.loading = true;
    let errorOccurred: boolean = false;

    if(this.listingType == ListingTypeEnum.STOCK){
      for(let listing of this.listings){
        this.stocksService.getStockBySymbol(listing.symbol).subscribe(
          (data) => {
            listing.price = listing.quantity * data.price;
          },
          (error) => {
            errorOccurred = true;
          }
        )
      }
    }
    else if(this.listingType == ListingTypeEnum.FOREX){
      for(let listing of this.listings){
        let symbolFrom = listing.symbol.split('/')[0];
        let symbolTo = listing.symbol.split('/')[1];
        this.forexService.getForex(symbolFrom, symbolTo, 0, 1).subscribe(
          (data) => {
            listing.price = listing.quantity * data.content[0].exchangeRate;
          },
          (error) => {
            errorOccurred = true;
          }
        )
      }
    }


    this.loading = false;

    if(errorOccurred){
      this.popupComponent.openPopup("Došlo je do greške prilikom dohvatanja cena.");
    }
  }

}
