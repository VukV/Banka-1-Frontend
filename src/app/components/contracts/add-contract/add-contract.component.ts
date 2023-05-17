import {Component, OnInit, ViewChild} from '@angular/core';
import {Transaction, TransactionAction} from "../../../model/contracts/contract";
import {PopupComponent} from "../../popup/popup/popup.component";
import {Router} from "@angular/router";
import {ContractsService} from "../../../services/contracts/contracts.service";
import {ContractRequest} from "../../../model/contracts/contract-request";

@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.css']
})
export class AddContractComponent implements OnInit{

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

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


  constructor(private router: Router, private contractsService: ContractsService) {
  }

  ngOnInit(): void {
  }

  addContract(){
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
    let createContractRequest = new ContractRequest(this.companyId, this.referenceNumber, this.description, this.transactions);

    this.contractsService.createContract(createContractRequest).subscribe(
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

  private returnToContracts(){
    this.router.navigate(["contracts"]);
  }

  cancel(){
    this.returnToContracts();
  }
}
