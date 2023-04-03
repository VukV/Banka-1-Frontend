import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-company-popup',
  templateUrl: './create-company-popup.component.html',
  styleUrls: ['./create-company-popup.component.css']
})
export class CreateCompanyPopupComponent implements OnInit {

  message: string = "";
  displayStyle = "none";

  constructor() { }

  ngOnInit(): void {
  }

  openPopup(message: string){
    this.message = message;
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }

}
