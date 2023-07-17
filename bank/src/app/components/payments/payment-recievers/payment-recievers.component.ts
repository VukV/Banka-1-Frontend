import {Component, ViewChild} from '@angular/core';
import {Interaction} from "chart.js";
import {Router} from "@angular/router";
import {RecieverModel} from "../../../model/payments/reciever-model";
import {PaymentService} from "../../../services/payment/payment.service";
import {PopupComponent} from "../../popup/popup/popup.component";
import {AddRecieverPopupComponent} from "../popup/add-reciever-popup/add-reciever-popup.component";
import {UpdateRecieverPopupComponent} from "../popup/update-reciever-popup/update-reciever-popup.component";

@Component({
  selector: 'app-payment-recievers',
  templateUrl: './payment-recievers.component.html',
  styleUrls: ['./payment-recievers.component.css']
})
export class PaymentRecieversComponent {

  id = 0
  fullName: string = ""
  accountNumber: string = ""
  receivers!: RecieverModel[];

  page: number = 1;
  receiversPerPage: number = 6;
  totalPages: number = 0;
  currentPage: number = 1;
  totalReceivers: number = 0;

  loading: boolean = false;

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  @ViewChild(AddRecieverPopupComponent)
  addReceiverPopup!: AddRecieverPopupComponent

  @ViewChild(UpdateRecieverPopupComponent)
  updateRecieverPopupComponent!: UpdateRecieverPopupComponent


  constructor(private router: Router, private paymentService: PaymentService) {
  }

  ngOnInit(){
    this.getRecievers();
  }

  getRecievers(){
    this.paymentService.getReceivers(this.page-1, this.receiversPerPage).subscribe(
      (data) => {
        this.receivers = data;
        this.totalPages = data.totalPages;
        this.totalReceivers = data.totalElements;
        this.loading = false;
        console.log(data);
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
        this.loading = false;
      }
    )
  }

  pageChangeEvent(event: number){
    this.page = event;
    this.getRecievers();
  }

  addRecieverPopUp(){
    this.addReceiverPopup?.openPopup()
  }

  changeReciever(receiver: RecieverModel){
    this.updateRecieverPopupComponent?.openPopup(receiver)

  }

  deleteReciever(id: number){
    this.paymentService.deleteReceiver(id).subscribe((data) => {
        console.log(data)
        this.getRecievers()
      },
      (error) => {
        this.loading = false;
        this.popupComponent.openPopup(error.message);
      })
  }



}
