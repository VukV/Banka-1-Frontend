import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.css']
})
export class ConfirmationPopupComponent implements OnInit{

  displayStyle = "none";
  @Output() confirmed = new EventEmitter<{ confirmed: boolean }>();

  constructor() { }

  ngOnInit(): void {
  }

  openPopup(){
    this.displayStyle = "block";
  }

  confirm(){
    this.displayStyle = "none";
    this.confirmed.emit({ confirmed: true });
  }

  cancel() {
    this.displayStyle = "none";
    this.confirmed.emit({ confirmed: false });
  }


}
