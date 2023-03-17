import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-margin-popup',
  templateUrl: './margin-popup.component.html',
  styleUrls: ['./margin-popup.component.css']
})
export class MarginPopupComponent implements OnInit {


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
