import {Component, ViewChild} from '@angular/core';
import {PopupComponent} from "../../../popup/popup/popup.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PaymentService} from "../../../../services/payment/payment.service";

@Component({
  selector: 'app-add-reciever-popup',
  templateUrl: './add-reciever-popup.component.html',
  styleUrls: ['./add-reciever-popup.component.css']
})
export class AddRecieverPopupComponent {

  id: string = ""
  name: string = ""
  accountNumber: string = ""
  referenceNumber: string = ""
  paymentNumber: string = ""
  paymentPurpose: string = ""

  displayStyle = "none"
  loading: boolean = false

  createRecieverGroup!: FormGroup

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent

  constructor(private paymentService: PaymentService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createRecieverGroup = this.formBuilder.group({
      accountNumber: ['', Validators.required],
      name: ['', Validators.required],
      referenceNumber: ['', Validators.required],
      paymentNumber: ['', Validators.required],
      paymentPurpose: ['', Validators.required],
    });
  }

  openPopup(){
    this.displayStyle = "block"
  }

  closePopup() {
    this.displayStyle = "none"
  }

  createReciever(name: string, accountNumber: string, referenceNumber: string, paymentNumber: string, paymentPurpose: string){
    if(this.createRecieverGroup.invalid){
      this.popupComponent.openPopup("Sva polja su obavezna.");
    }else{
      this.loading = true
      this.paymentService.createReceiver(name, accountNumber, referenceNumber, paymentNumber, paymentPurpose).subscribe(
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


}
