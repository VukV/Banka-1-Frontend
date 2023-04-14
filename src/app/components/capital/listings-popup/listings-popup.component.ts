import {Component, OnInit} from '@angular/core';
import {Listing} from "../../../model/capital/listing";

@Component({
  selector: 'app-listings-popup',
  templateUrl: './listings-popup.component.html',
  styleUrls: ['./listings-popup.component.css']
})
export class ListingsPopupComponent implements OnInit{

  displayStyle: string = "none"
  listings: any[] = [];

  constructor() {
  }

  ngOnInit(): void { }

  openPopUp(listings: any): void{
    this.listings = listings;
    this.displayStyle = "block"
  }

  closePopUp(): void{
    this.displayStyle = "none"
  }

}
