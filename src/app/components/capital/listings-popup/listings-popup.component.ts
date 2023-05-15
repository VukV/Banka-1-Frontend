import {Component, OnInit, ViewChild} from '@angular/core';
import {Listing} from "../../../model/capital/listing";
import {StocksService} from "../../../services/stocks/stocks.service";
import {PopupComponent} from "../../popup/popup/popup.component";

@Component({
  selector: 'app-listings-popup',
  templateUrl: './listings-popup.component.html',
  styleUrls: ['./listings-popup.component.css']
})
export class ListingsPopupComponent implements OnInit{

  displayStyle: string = "none"
  listings: Listing[] = [];

  loading: boolean = false;

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  constructor(private stocksService: StocksService) {
  }

  ngOnInit(): void { }

  openPopUp(listings: Listing[]): void{
    this.listings = listings;
    this.displayStyle = "block"
    this.getListingPrices();
  }

  closePopUp(): void{
    this.displayStyle = "none"
  }

  getListingPrices(){
    this.loading = true;
    let errorOccurred: boolean = false;

    for(let listing of this.listings){
      this.stocksService.getStockBySymbol(listing.symbol).subscribe(
        (data) => {
          listing.price = listing.quantity * data.price;
        },
        (error) => {
          errorOccurred = true
        }
      )
    }

    this.loading = false;

    if(errorOccurred){
      this.popupComponent.openPopup("Došlo je do greške prilikom dohvatanja cena.");
    }
  }

}
