import {Component, ViewChild} from '@angular/core';
import {EmployeeModel} from "../../../model/employee/employee";
import {PopupComponent} from "../../popup/popup/popup.component";
import {EmployeesDialogComponent} from "../employees-dialog/employees-dialog.component";
import {EmployeesService} from "../../../services/employee/employees.service";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {

  employees: EmployeeModel[] = [];
  firstName: string="";

  lastName: string="";
  dailyLimit: number | undefined = 0;

  totalPages: number = 0;
  currentPage: number = 1;
  totalUsers: number = 0;
  page: number = 1;
  usersPerPage: number = 6;
  showDialog = false;

  @ViewChild(EmployeesDialogComponent)
  employeeDialog!: EmployeesDialogComponent;

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  openDialog(employeeName: string, employeeLastName: string, dailyLimit: number, employeeId: number): void {
    this.employeeDialog.openPopup(employeeName, employeeLastName, dailyLimit, employeeId);
  }

  constructor(private employeesService: EmployeesService) {
    this.employeesService;
  }

  ngOnInit(): void {
    this.searchEmployees();
  }


  searchEmployees(){
    this.employeesService.getEmpolyees(this.page-1, this.usersPerPage).subscribe(
      (data) => {
        this.employees = data.content;
        this.totalPages = data.totalPages;
        this.totalUsers = data.totalElements;
      },
      (error) => {
        this.popupComponent.openPopup("Nemate pristup");
      }
    )
  }
  pageChangeEvent(event: number){
    this.page = event;
    this.searchEmployees();
  }
}
