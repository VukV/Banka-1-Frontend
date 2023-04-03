import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-add-contract-popup',
  templateUrl: './add-contract-popup.component.html',
  styleUrls: ['./add-contract-popup.component.css']
})
export class AddContractPopupComponent implements OnInit {
  message: string = "";
  displayStyle = "none";

  constructor() {
  }

  ngOnInit(): void {
  }

  openPopup(message: string) {
    this.message = message;
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }
}
