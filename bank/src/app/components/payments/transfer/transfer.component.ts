import {Component, ViewChild} from '@angular/core';
import {PaymentService} from "../../../services/payment/payment.service";
import {HttpClient} from "@angular/common/http";
import {PopupComponent} from "../../popup/popup/popup.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AccountModel} from "../../../model/payments/account-model";
import {TransferApprovalPopupComponent} from "../popup/transfer-approval-popup/transfer-approval-popup.component";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent {

  dropdownData: any[] = []
  accountModel!: AccountModel[]
  createTransferGroup!: FormGroup
  sender: string = ""
  receiver: string = ""
  amount!: number
  availableSenderAmount: number = 0
  availableReceiverAmount: number = 0
  senderAccountCurrencySymbol: string = ""
  receiverAccountCurrencySymbol: string = ""
  currencySymbol: string = "RSD"
  currencies: string[] = ["RSD", "EUR", "USD", "CHF", "GBP", "JPY", "CAD", "AUD"]
  dropdownSenderAccNoTitle: string = "Izaberite račun"
  dropdownReceiverAccNoTitle: string = "Izaberite račun"
  isPossible = false
  isValid = true

  senderAccountNum: string[] = []
  receiverAccountNum: string[] = []

  loading: boolean = false;

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  @ViewChild(TransferApprovalPopupComponent)
  transferApprovalPopupComponent!: TransferApprovalPopupComponent;

  constructor(private paymentService: PaymentService, private httpClient: HttpClient,
              private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit(){
    this.getAllUsersAccounts();

  }

  getAllUsersAccounts(): void{
    this.paymentService.getAllAccountsForLoggedInUser().subscribe(
      (data) => {
        this.accountModel = data;
        this.cleanUpAccounts();
        this.loading = false;
        console.log(data)
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
        this.loading = false;
      }
    )
  }

  private cleanUpAccounts(){
    this.accountModel = this.accountModel.filter((acc) => acc.accountType !== 'FOREIGN_CURRENCY');
  }

  checkIfValid(): boolean {
    console.log(this.dropdownSenderAccNoTitle, this.dropdownReceiverAccNoTitle)
    if (this.dropdownSenderAccNoTitle !== "" && this.dropdownSenderAccNoTitle !== "Izaberi račun"
    && this.dropdownReceiverAccNoTitle !== "" && this.dropdownReceiverAccNoTitle !== "Izaberi račun" && this.amount !== 0
    && this.dropdownSenderAccNoTitle !== this.dropdownReceiverAccNoTitle) {
      return true;
    } else {
      return false;
    }
  }

  isTransactionPossible(){
    if(this.senderAccountCurrencySymbol != this.receiverAccountCurrencySymbol){
      this.isPossible = false
      this.popupComponent.openPopup("Prenos je moguće obaviti samo u okviru istih valuta.")
    }

    if(this.senderAccountCurrencySymbol != this.receiverAccountCurrencySymbol)
      this.isPossible = true

    if(this.amount > this.availableSenderAmount){
      this.isPossible = false
      this.popupComponent.openPopup("Nemate dovoljno sredstava na računu.")
    }else{
      this.isPossible = true
    }

    if(this.createTransferGroup.invalid) {
      this.isPossible = false
      this.popupComponent.openPopup("Sva polja su obavezna.");
    }else{
      this.isPossible = true
    }
  }

  createTransfer(senderAccountNumber: string, receiverAccountNumber: string, amount: number, currencySymbol: string){
    this.isTransactionPossible()

    if(this.isPossible == true){
      this.loading = true
      this.paymentService.createTransfer(senderAccountNumber, receiverAccountNumber, amount, currencySymbol).subscribe(
        () => {
          this.popupComponent.openPopup("Prenos je izvršen.");
          this.loading = false;
        },
        (error) => {
          this.popupComponent.openPopup(error.message);
          this.loading = false;
        }
      )
    }

  }

  homeRedirect(){
    this.router.navigate([""])
  }

  selectedSenderAccountNum(accountModel: AccountModel){
    this.dropdownSenderAccNoTitle = accountModel.accountNumber;
    this.availableSenderAmount = accountModel.accountBalance;
    this.senderAccountCurrencySymbol = accountModel.defaultCurrencyCode;

  }

  selectedReceiverAccountNum(accountModel: AccountModel){
    this.dropdownReceiverAccNoTitle = accountModel.accountNumber;
    this.availableReceiverAmount = accountModel.accountBalance;
    this.receiverAccountCurrencySymbol = accountModel.defaultCurrencyCode;

  }

  selectedCurrencySymbol(curencySymbol: string){

  }
}
