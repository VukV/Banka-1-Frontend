import { Component } from '@angular/core';
import {ContractsService} from "../../../services/contracts/contracts.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-finalise-contract-popup',
  templateUrl: './finalise-contract-popup.component.html',
  styleUrls: ['./finalise-contract-popup.component.css']
})
export class FinaliseContractPopupComponent {

  selectedFile: File | null = null;
  displayStyle = "none";

  constructor(private contractsService: ContractsService, private router: Router) {
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
    else {
      this.selectedFile = null;
    }
  }

  finaliseContract(){
    //TODO check if pdf format
    //TODO upload

    //todo on success -> returnToContracts
  }

  returnToContracts(){
    this.router.navigate(["contracts"]);
  }

  cancel(){
    this.displayStyle = "none";
  }

  openPopup(){
    this.displayStyle = "block";
  }

}
