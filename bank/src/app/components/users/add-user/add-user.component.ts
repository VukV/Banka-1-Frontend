import {Component, OnInit, ViewChild} from '@angular/core';
import {UserPositionEnum} from "../../../model/user/user-position-enum";
import {UserRoleEnum} from "../../../model/user/user-role-enum";
import {UserService} from "../../../services/user/user.service";
import {PopupComponent} from "../../popup/popup/popup.component";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  emailRegex = new RegExp("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
  jmbgRegex = new RegExp("^[0-9]{13}$");
  phoneRegex = new RegExp('^((\\+381)|0)6[0-9]{4,8}$');

  email: string = "";
  phone: string = "";
  jmbg: string = "";
  firstName: string = "";
  lastName: string = "";
  position: string = "";
  allPositions: string[] = Object.values(UserPositionEnum);
  roles: string[] = [];
  allRoles: string[] = Object.values(UserRoleEnum);
  error: string = "";
  address: string="";
  dateBirth!: Date;
  dateBirthString: string="";
  gender: string="";

  constructor(private userService: UserService,
              private router: Router,
              private datePipe: DatePipe) { }

  ngOnInit(): void { }

  roleCheckChanged(role: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked)
      this.roles.push(role);
    else
      this.roles = this.roles.filter(arrayRole => arrayRole !== role);
  }
  formatDate(date: Date): string {
    return <string>this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  addUser(): void {
    this.error = "";
    if (!this.emailRegex.test(this.email)) {
      this.error = "Email nije validan!";
      return;
    }
    if (!this.phoneRegex.test(this.phone)) {
      this.error = "Telefon nije validan!";
      return;
    }
    if (this.firstName == "") {
      this.error = "Ime mora biti uneto!";
      return;
    }
    if (this.lastName == "") {
      this.error = "Prezime mora biti uneto!";
      return;
    }
    if (this.address == "") {
      this.error = "Adresa mora biti uneta!";
      return;
    }
    if (this.gender == "") {
      this.error = "Pol mora biti unet!";
      return;
    }
    if (this.dateBirth==null) {
      this.error = "Datum rodjenja mora biti unet!";
      return;
    }

    this.dateBirthString=this.formatDate(this.dateBirth).replace(/\//g, '-');

    const position = Object.keys(UserPositionEnum)[Object.values(UserPositionEnum).indexOf(this.position as UserPositionEnum)];
    const roles = this.roles.map(role => Object.keys(UserRoleEnum)[Object.values(UserRoleEnum).indexOf(role as UserRoleEnum)]);
    this.userService.addUser(this.firstName,this.lastName,this.dateBirthString,this.gender,this.email,this.phone,this.address,this.roles)
      .subscribe({
          next: () => this.router.navigate(["natural-persons"]),
          error: (error) => this.popupComponent.openPopup(`Registrovanje korisnika nije uspelo: ${error.error.message}`)
        }
      );
  }

  cancel(): void {
    this.router.navigate(["natural-persons"]);
  }
}
