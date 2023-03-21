import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checking-popup',
  templateUrl: './checking-popup.component.html',
  styleUrls: ['./checking-popup.component.css']
})
export class CheckingPopupComponent implements OnInit {

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






