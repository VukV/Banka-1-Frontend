import {Component, OnInit, ViewChild} from '@angular/core';
import {PregledKapitala, TekuciRacun} from "../../../model/capital-checking";
import {Listing, ListingSum} from "../../../model/capital/listing";
import {PopupComponent} from "../../popup/popup/popup.component";
import {CapitalService} from "../../../services/capital/capital.service";
import {CurrentUserService} from "../../../services/user/current-user.service";
import {ListingTypeEnum} from "../../../model/orders/listing-type-enum";
import {ListingsPopupComponent} from "../listings-popup/listings-popup.component";
import {UserService} from "../../../services/user/user.service";
import {BankAccount} from "../../../model/capital/bank-account";

@Component({
  selector: 'app-capital-checking',
  templateUrl: './capital-checking.component.html',
  styleUrls: ['./capital-checking.component.css']
})
export class CapitalCheckingComponent implements OnInit {

  userId: number = -1;
  listingsAll: Listing[] = [];
  listingSum: ListingSum[] = [];

  bankAccount: BankAccount | undefined;
  accountBalance: number = -1;
  dailyLimit: number = -1;

  loadingListings: boolean = false;
  loadingChecking: boolean = false;

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  @ViewChild(ListingsPopupComponent)
  listingsPopupComponent!: ListingsPopupComponent;

  constructor(private capitalService: CapitalService, private currentUserService: CurrentUserService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.userId = this.currentUserService.getUserId();
    this.getUserListings();
    this.getBankAccount();
  }

  getUserListings(){
    this.loadingListings = true;
    this.capitalService.getUserCapital(this.userId).subscribe(
      (data) => {
        this.listingsAll = data;
        this.sumListings(data);
        this.loadingListings = false;
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
        this.loadingListings = false;
      }
    )
  }

  getBankAccount(){
    this.loadingChecking = true;
    this.userService.getUser(this.userId).subscribe(
      (data) => {
        this.bankAccount = data.bankAccount;
        this.accountBalance = this.bankAccount.accountBalance;
        this.dailyLimit = this.bankAccount.dailyLimit;
        this.loadingChecking = false;
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
        this.loadingChecking = false;
      }
    )
  }

  private sumListings(listingsData: Listing[]){
    let listingTypes = Object.values(ListingTypeEnum);
    listingTypes.forEach(value => {
      let valueSum = listingsData.filter(listing => listing.listingType === value)
        .reduce((sum, current) => sum + current.quantity, 0);

      this.listingSum.push({ listingType: value, quantity: valueSum });
    })
  }

  openDetailsListings(listingType: ListingTypeEnum){
    let filteredListings = this.listingsAll.filter((listing) => {
      return listing.listingType == listingType;
    });

    //grupise porudzbine po simbolu
    // let groupedBySymbol = filteredListings.reduce((acc: { [key: string]: number }, curr: Listing) => {
    //   if (!acc[curr.symbol]) {
    //     acc[curr.symbol] = curr.quantity;
    //   } else {
    //     acc[curr.symbol] += curr.quantity;
    //   }
    //   return acc;
    // }, {});

    //console.log(groupedBySymbol);

    this.listingsPopupComponent.openPopUp(filteredListings);
  }

}
