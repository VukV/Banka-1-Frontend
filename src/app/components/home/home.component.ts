import {Component, OnInit, ViewChild} from '@angular/core';
import {PopupComponent} from "../popup/popup.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  constructor() { }

  ngOnInit(): void {
  }

  openPopupExample(){
    this.popupComponent.openPopup("Otvoren popup!");
  }

}
