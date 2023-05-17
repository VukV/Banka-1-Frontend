import {Component, OnInit, ViewChild} from '@angular/core';
import {Transaction} from "../../../model/contracts/contract";
import {PopupComponent} from "../../popup/popup/popup.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.css']
})
export class AddContractComponent implements OnInit{

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  companies: [] = [];
  companyId: number = -1;
  referenceNumber: string = "";
  description: string = "";
  transactions: Transaction[] = [];

  loading: boolean = false;
  error: string = "";


  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  addContract(){

  }

  cancel(){
    this.router.navigate(["contracts"]);
  }
}
