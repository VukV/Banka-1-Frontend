import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PopupComponent} from "../../../popup/popup/popup.component";
import {PaymentService} from "../../../../services/payment/payment.service";
import {Router} from "@angular/router";
import {RecieverModel} from "../../../../model/payments/reciever-model";

@Component({
  selector: 'app-update-reciever-popup',
  templateUrl: './update-reciever-popup.component.html',
  styleUrls: ['./update-reciever-popup.component.css']
})
export class UpdateRecieverPopupComponent {

  id: number = 0
  receiverName: string = ""
  receiverAccountNumber: string = ""
  referenceNumber: string = ""
  paymentNumber: string = ""
  paymentPurpose: string = ""

  displayStyle = "none"
  loading: boolean = false

  updateReceiverGroup!: FormGroup

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent

  constructor(private paymentService: PaymentService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.updateReceiverGroup = this.formBuilder.group({
      receiverName: ['', Validators.required],
      receiverAccountNumber: ['', Validators.required],
      referenceNumber: ['', Validators.required],
      paymentNumber: ['', Validators.required],
      paymentPurpose: ['', Validators.required],
    });
  }

  openPopup(receiver: RecieverModel){
    this.id = receiver.id
    this.receiverName = receiver.receiverName
    this.receiverAccountNumber = receiver.receiverAccountNumber
    this.referenceNumber = receiver.referenceNumber
    this.paymentNumber = receiver.paymentNumber
    this.paymentPurpose = receiver.paymentPurpose

    this.displayStyle = "block"
  }

  closePopup() {
    this.displayStyle = "none"
  }

  updateReceiver(id: number, receiverName: string, receiverAccountNumber: string, referenceNumber: string, paymentNumber: string, paymentPurpose: string){
    if(this.updateReceiverGroup.invalid){
      this.popupComponent.openPopup("Sva polja su obavezna.");
    }else{
      this.paymentService.updateReceiver(id, receiverName, receiverAccountNumber, referenceNumber, paymentNumber, paymentPurpose)
        .subscribe({
            next: () => window.location.reload(),
            error: (error) => this.popupComponent.openPopup(`Čuvanje izmena nije uspelo: ${error.error.message}`)
          }
        );
    }
  }

}
