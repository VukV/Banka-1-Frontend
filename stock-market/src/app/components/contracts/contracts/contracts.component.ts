import {Component, OnInit, ViewChild} from '@angular/core';
import {PopupComponent} from "../../popup/popup/popup.component";
import {CurrentUserService} from "../../../services/user/current-user.service";
import {ContractsService} from "../../../services/contracts/contracts.service";
import {UserRoleEnum} from "../../../model/user/user-role-enum";
import {Contract, ContractStatus} from "../../../model/contracts/contract";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {

  userId: number = -1;
  isAdmin: boolean = false;
  isSupervisor: boolean = false;

  contractFinal = ContractStatus.FINAL;

  contracts: Contract[] = [];

  loading: boolean = false;
  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  constructor(private currentUserService: CurrentUserService, private contractsService: ContractsService, private router: Router) { }

  ngOnInit(): void {
    this.userId = this.currentUserService.getUserId();
    this.checkRoles();

    if(this.isAdmin || this.isSupervisor){
      this.getContracts();
    }
    else {
      this.getAgentContracts();
    }
  }

  getContracts(){
    this.loading = true;

    this.contractsService.getContracts().subscribe(
      (data) => {
        this.contracts = data;
        this.loading = false;
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
        this.loading = false;
      }
    );
  }

  getAgentContracts(){
    this.loading = true;

    this.contractsService.getAgentContracts().subscribe(
      (data) => {
        this.contracts = data;
        this.loading = false;
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
        this.loading = false;
      }
    );
  }

  downloadContract(contractId: string){
    this.contractsService.downloadContract(contractId).subscribe(
      (response: Blob) => {
        let fileName = 'contract_' + contractId + '.pdf';
        const fileUrl = URL.createObjectURL(response);

        // Create a temporary anchor element to trigger the download
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        link.click();

        // Clean up the temporary URL and anchor element
        URL.revokeObjectURL(fileUrl);
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
      }
    );
  }

  openUpdateContract(contract: Contract){
    if(contract.status == ContractStatus.FINAL){
      this.popupComponent.openPopup("Finalizovan ugovor ne može da se menja.");
      return;
    }
    this.router.navigate(["contracts/update/" + contract._id]);
  }

  private checkRoles(){
    this.isAdmin = this.currentUserService.checkUserRole(UserRoleEnum.ROLE_ADMIN);
    this.isSupervisor = this.currentUserService.checkUserRole(UserRoleEnum.ROLE_SUPERVISOR);
  }

}
