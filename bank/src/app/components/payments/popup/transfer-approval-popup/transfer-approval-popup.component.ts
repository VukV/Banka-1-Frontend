import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PopupComponent} from "../../../popup/popup/popup.component";
import {PaymentService} from "../../../../services/payment/payment.service";

@Component({
  selector: 'app-transfer-approval-popup',
  templateUrl: './transfer-approval-popup.component.html',
  styleUrls: ['./transfer-approval-popup.component.css']
})
export class TransferApprovalPopupComponent {
  id: string = ""
  senderAccountNumber: string = ""
  receiverAccountNumber: string = ""
  amount: number = 0
  currencySymbol: string = ""
  createTransferGroup!: FormGroup
  verificationCode: string = ""

  displayStyle = "none"
  loading: boolean = false


  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent

  constructor(private paymentService: PaymentService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createTransferGroup = this.formBuilder.group({
      verificationCode: ['', Validators.required],
    });
  }

  openPopup(dropdownSenderAccNoTitle: string,
            dropdownReceiverAccNoTitle: string, amount: number, currencySymbol: string){
    this.displayStyle = "block"
    this.senderAccountNumber = dropdownSenderAccNoTitle
    this.receiverAccountNumber = dropdownReceiverAccNoTitle
    this.amount = amount
    this.currencySymbol = currencySymbol
  }

  closePopup() {
    this.displayStyle = "none"
  }

  createTransfer(senderAccountNumber: string, receiverAccountNumber: string, amount: number, currencySymbol: string){
    this.loading = true;

    this.paymentService.createTransfer(senderAccountNumber, receiverAccountNumber, amount, currencySymbol).subscribe(
      () => {
        this.closePopup();
        window.location.reload();
        this.loading = false;
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
        this.loading = false;
      }
    )
  }

}
