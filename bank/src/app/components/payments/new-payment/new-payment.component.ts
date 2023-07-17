import {Component, ViewChild} from '@angular/core';
import {
  DomesticPaymentDetailsPopupComponent
} from "../popup/domestic-payment-details-popup/domestic-payment-details-popup.component";
import {ExchangeDetailsPopupComponent} from "../popup/exchange-details-popup/exchange-details-popup.component";
import {PopupComponent} from "../../popup/popup/popup.component";
import {PaymentService} from "../../../services/payment/payment.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RecieverModel} from "../../../model/payments/reciever-model";
import {Router} from "@angular/router";
import {AccountModel} from "../../../model/payments/account-model";

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css']
})
export class NewPaymentComponent {

  id: string = ""
  receiverName: string = ""
  receiverAccountNumber: string = ""
  referenceNumber: string = ""
  paymentNumber: string = ""
  paymentPurpose: string = ""
  currency: string = ""
  senderAccountNumber: string = ""
  amount = 0
  availableAmount = 123456
  choose: string = "Odaberi"
  receivers!: RecieverModel[]
  receiver!: RecieverModel
  receiversAccountNumbers: string[] = []
  isPossible: boolean = false;
  createNewPayment!: FormGroup
  accountModel: AccountModel[] = []

  loading: boolean = false;

  @ViewChild(PopupComponent)
  popup!: PopupComponent

  constructor(private paymentService: PaymentService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.getReceivers()
    this.getAllUsersAccounts()
    this.createNewPayment = this.formBuilder.group({
      receiverAccountNumber: ['', Validators.required],
      receiverName: ['', Validators.required],
      referenceNumber: ['', Validators.required],
      paymentNumber: ['', Validators.required],
      paymentPurpose: ['', Validators.required],
      amount: ['', Validators.required]
    });

  }

  getSenderAccount(id: string){

  }

  getAvailableAmount(amount: string){

  }

  getReceivers(){
    this.paymentService.getReceiverList().subscribe(
      (data) => {
        this.receivers = data;
       // this.setAvailableRecievers(this.receivers)
        this.loading = false;
        console.log(data);
      },
      (error) => {
        this.popup.openPopup(error.message);
        this.loading = false;
      }
    )
  }


  //ToDo proveri kako radi input u zavisnosti od ovoga
  selectedReceiver(receiver: RecieverModel){
    this.receiver = receiver
    this.referenceNumber = receiver.referenceNumber
    this.paymentNumber = receiver.paymentNumber
    this.receiverAccountNumber = receiver.receiverAccountNumber
    this.receiverName = receiver.receiverName
    this.paymentPurpose = receiver.paymentPurpose
    console.log(this.createNewPayment)
  }

  homePageRedirect(){
    this.router.navigate([""])
  }

  isTransactionPossible(){
    if(this.amount > this.availableAmount){
      this.isPossible = false
      this.popup.openPopup("Nemate dovoljno sredstava na računu.")
    }else{
      this.isPossible = true
    }

    if(this.createNewPayment.invalid) {
      this.isPossible = false
      this.popup.openPopup("Sva polja su obavezna.");
    }else{
      this.isPossible = true
    }
  }

  createPayment(receiverName: string, senderAccountNumber: string, receiverAccountNumber: string, amount: number, referenceNumber: string, paymentNumber: string,
                paymentPurpose: string){
    this.isTransactionPossible()

    if(this.isPossible == true){
      this.loading = true
      this.paymentService.createPayment(receiverName, senderAccountNumber, receiverAccountNumber, amount, referenceNumber, paymentNumber,
        paymentPurpose).subscribe(
        () => {
          this.popup.openPopup("Plaćanje je izvršeno.");
          this.loading = false;
        },
        (error) => {
          this.popup.openPopup(error.message);
          this.loading = false;
        }
      )
    }
  }

  getAllUsersAccounts(): void{
    this.paymentService.getAllAccountsForLoggedInUser().subscribe(
      (data) => {
        this.accountModel = data;
        this.setUserAccount(data);
        this.loading = false;
      },
      (error) => {
        this.popup.openPopup(error.message);
        this.loading = false;
      }
    )
  }

  setUserAccount(userAccounts: AccountModel[]){
    for(const a of userAccounts){
      if(a.defaultCurrencyCode === "RSD"){
        this.availableAmount = a.accountBalance
        this.senderAccountNumber = a.accountNumber
      }
    }

  }
}
