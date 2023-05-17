import {Component, OnInit, ViewChild} from '@angular/core';
import {PopupComponent} from "../../popup/popup/popup.component";
import {ContractStatus, Transaction, TransactionAction} from "../../../model/contracts/contract";
import {ActivatedRoute, Router} from "@angular/router";
import {ContractsService} from "../../../services/contracts/contracts.service";
import {ContractRequest} from "../../../model/contracts/contract-request";
import {UserRoleEnum} from "../../../model/user/user-role-enum";
import {CurrentUserService} from "../../../services/user/current-user.service";
import {ConfirmationPopupComponent} from "../../popup/confirmation-popup/confirmation-popup.component";
import {FinaliseContractPopupComponent} from "../finalise-contract-popup/finalise-contract-popup.component";

@Component({
  selector: 'app-update-contract',
  templateUrl: './update-contract.component.html',
  styleUrls: ['./update-contract.component.css']
})
export class UpdateContractComponent implements OnInit{

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  @ViewChild(FinaliseContractPopupComponent)
  finaliseContractPopupComponent!: FinaliseContractPopupComponent;

  contractId: string = "";
  companyId: number = -1;
  referenceNumber: string = "";
  description: string = "";
  transactions: Transaction[] = [];

  //TODO fetch companies
  company = {
    name: "Test",
    id: 1
  }
  companies: any[] = [this.company];

  transactionActions: string[] = Object.values(TransactionAction);
  transactionId: number = 0;

  //TODO fetch stocks and get symbols only
  stockSymbols: string[] = [];

  loading: boolean = false;
  error: string = "";

  userId: number = -1;
  isAdmin: boolean = false;
  isSupervisor: boolean = false;

  constructor(private currentUserService: CurrentUserService, private router: Router, private route: ActivatedRoute, private contractsService: ContractsService) {
  }

  ngOnInit(): void {
    this.userId = this.currentUserService.getUserId();
    this.checkRoles();

    this.route.params.subscribe(params => {
      this.contractId = params['contractId'];
      this.getContract();
    });
  }

  private getContract(){
    this.loading = true;

    this.contractsService.getContract(this.contractId).subscribe(
      (data) => {
        this.companyId = data.companyId;
        this.referenceNumber = data.referenceNumber;
        this.description = data.description
        this.transactions = data.transactions;

        if(data.status == ContractStatus.FINAL){
          this.returnToContracts();
        }

        this.setupTransactions();
        this.loading = false;
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
        this.loading = false;
      }
    );
  }

  updateContract(){
    if(this.companyId == -1){
      this.error = 'Nije odabrana kompanija.';
      return;
    }
    else if(this.referenceNumber === "" || !this.referenceNumber){
      this.error = "Delovodni broj nije upisan."
      return;
    }
    else {
      if(!this.validateTransactions()){
        return;
      }
    }

    this.loading = true;
    let updateContractRequest = new ContractRequest(this.companyId, this.referenceNumber, this.description, this.transactions);

    this.contractsService.updateContract(this.contractId, updateContractRequest).subscribe(
      () => {
        this.loading = false;
        this.returnToContracts();
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
        this.loading = false;
      }
    );
  }

  deleteContract(){
    this.loading = true;

    this.contractsService.deleteContract(this.contractId).subscribe(
      () => {
        this.loading = false;
        this.returnToContracts();
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
        this.loading = false;
      }
    );
  }

  finaliseContract(){
    this.finaliseContractPopupComponent.openPopup();
  }

  cancel(){
    this.returnToContracts();
  }

  private returnToContracts(){
    this.router.navigate(["contracts"]);
  }

  addTransaction(){
    this.transactionId++;
    this.transactions.push({
      action: TransactionAction.BUY,
      symbol: '',
      quantity: 0,
      price: 0,
      ngId: this.transactionId
    });
  }

  removeTransaction(transactionId: number){
    const index = this.transactions.findIndex((transaction) => transaction.ngId === transactionId);
    this.transactions.splice(index, 1);
  }

  private setupTransactions(){
    for(let transaction of this.transactions){
      transaction.ngId = this.transactionId;
      this.transactionId++;
    }
  }

  private validateTransactions(): boolean{
    for(let transaction of this.transactions){
      if(transaction.symbol === "" || !transaction.symbol){
        this.error = 'Akcija nije odabrana.'
        return false;
      }
      if(!(transaction.quantity > 0)){
        this.error = 'Količina nije postavljena.'
        return false;
      }
      if(!(transaction.price > 0)){
        this.error = 'Cena nije postavljena.'
        return false;
      }
    }

    return true;
  }

  private checkRoles(){
    this.isAdmin = this.currentUserService.checkUserRole(UserRoleEnum.ROLE_ADMIN);
    this.isSupervisor = this.currentUserService.checkUserRole(UserRoleEnum.ROLE_SUPERVISOR);
  }

}
