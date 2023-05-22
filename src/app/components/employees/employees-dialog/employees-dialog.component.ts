import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {EmployeesService} from "../../../services/employee/employees.service";
import {PopupComponent} from "../../popup/popup/popup.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employees-dialog',
  templateUrl: './employees-dialog.component.html',
  styleUrls: ['./employees-dialog.component.css']
})
export class EmployeesDialogComponent {
  displayStyle = "none";
  employeeName: string = "";
  employeeLastName: string = "";
  selectedValue: number = 0;
  dailyLimit: number = 0

  employeeId: number=0

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  constructor(private router: Router,private employeesService: EmployeesService) {
    this.employeesService;
  }

  ngOnInit(): void {
  }

  openPopup(employeeName: string, employeeLastName: string, dailyLimit: number, employeeId: number){
    this.displayStyle = "block";
    this.employeeName = employeeName;
    this.employeeLastName = employeeLastName;
    this.dailyLimit = dailyLimit;
    this.employeeId = employeeId;
  }

  closePopup() {
    this.displayStyle = "none";
  }

  resetDailyLimit(employeeId: number){
    this.employeesService.resetDailyLimit(employeeId).subscribe(
      (data) => {
        this.dailyLimit = data.content;
        this.closePopup();
        window.location.reload();
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
        this.closePopup();
      }
    );
  }

  setDailyLimit(employeeId: number, limit: number){
    this.employeesService.setDailyLimit(employeeId, limit)
      .subscribe(
        (data) => {
          this.closePopup();
          window.location.reload();
        },
        (error) => {
          this.popupComponent.openPopup(error.message);
          this.closePopup();
        }
      );
  }

}
