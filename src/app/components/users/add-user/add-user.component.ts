import {Component, OnInit, ViewChild} from '@angular/core';
import {UserPositionEnum} from "../../../model/user/user-position-enum";
import {UserRoleEnum} from "../../../model/user/user-role-enum";
import {UserService} from "../../../services/user/user.service";
import {PopupComponent} from "../../popup/popup.component";
import {Router} from "@angular/router";

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

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void { }

  roleCheckChanged(role: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked)
      this.roles.push(role);
    else
      this.roles = this.roles.filter(arrayRole => arrayRole !== role);
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
    if (!this.jmbgRegex.test(this.jmbg)) {
      this.error = "JMBG nije validan!";
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
    if (this.position == "") {
      this.error = "Pozicija mora biti odabrana!";
      return;
    }
    const position = Object.keys(UserPositionEnum)[Object.values(UserPositionEnum).indexOf(this.position as UserPositionEnum)];
    const roles = this.roles.map(role => Object.keys(UserRoleEnum)[Object.values(UserRoleEnum).indexOf(role as UserRoleEnum)]);
    this.userService.addUser(this.email, this.phone, this.jmbg, this.firstName, this.lastName, position, roles)
      .subscribe({
          next: () => this.router.navigate(["users"]),
          error: (error) => this.popupComponent.openPopup(`Registrovanje korisnika nije uspelo: ${error.error.message}`)
        }
      );
  }

  cancel(): void {
    this.router.navigate(["users"]);
  }
}
