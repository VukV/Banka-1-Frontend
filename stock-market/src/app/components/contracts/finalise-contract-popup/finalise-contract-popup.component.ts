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
  contractId: string = "";
  referenceNumber: string = "";

  loading: boolean = false;
  error: string = "";
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
    this.error = "";

    if(this.selectedFile){
      if(this.selectedFile.type != 'application/pdf'){
        this.error = 'Odabrani fajl nije PDF.'
      }

      this.loading = true;

      const formData = new FormData();
      formData.append('contractId', this.contractId);
      formData.append('referenceNumber', this.referenceNumber);
      formData.append('contractFile', this.selectedFile, this.selectedFile.name);

      this.contractsService.finaliseContract(formData).subscribe(
        () => {
          this.loading = false;
          this.returnToContracts();
        },
        (error) => {
          this.error = error.message;
          this.loading = false;
        }
      );
    }
  }

  returnToContracts(){
    this.router.navigate(["contracts"]);
  }

  cancel(){
    this.displayStyle = "none";
  }

  openPopup(contractId: string, referenceNumber: string){
    this.contractId = contractId;
    this.referenceNumber = referenceNumber;
    this.displayStyle = "block";
  }

}
