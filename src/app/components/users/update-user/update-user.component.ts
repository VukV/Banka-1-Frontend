import {Component, OnInit, ViewChild} from '@angular/core';
import {PopupComponent} from "../../popup/popup.component";
import {UserPositionEnum} from "../../../model/user-position-enum";
import {UserRoleEnum} from "../../../model/user-role-enum";
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  emailRegex = new RegExp("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
  jmbgRegex = new RegExp("^[0-9]{13}$");

  id: number = -1;
  email: string = "";
  phone: string = "";
  password: string = "";
  firstName: string = "";
  lastName: string = "";
  position: string = "";
  allPositions: string[] = Object.values(UserPositionEnum);
  roles: string[] = [];
  allRoles: string[] = Object.values(UserRoleEnum);
  active: boolean = true;
  error: string = "";

  constructor(private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get("userId");
    if (id == null) {
      this.router.navigate(["users"]);
      return;
    }
    this.id = parseInt(id);
    this.userService.getUser(this.id).subscribe({
      next: (userModel) => {
        this.email = userModel.email;
        this.phone = userModel.phoneNumber;
        this.firstName = userModel.firstName;
        this.lastName = userModel.lastName;
        this.position = userModel.position;
        this.roles = userModel.roles;
        this.active = userModel.active;
      },
      error: (error) => this.popupComponent.openPopup(`Nije uspelo dohvatanje korisnika: ${error.error.message}`)
    });
  }

  roleCheckChanged(role: string, event: Event): void {
    event.preventDefault();
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked)
      this.roles.push(role);
    else
      this.roles = this.roles.filter(arrayRole => arrayRole !== role);
  }

  updateUser(): void {
    this.error = "";
    if (!this.emailRegex.test(this.email)) {
      this.error = "Email nije validan!";
      return;
    }
    if (this.phone == "") {
      this.error = "Telefon mora biti unet!";
      return;
    }
    if (!this.jmbgRegex.test(this.password)) {
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
    this.userService.updateUser(this.id, this.email, this.phone, this.password, this.firstName, this.lastName, position, roles, this.active)
      .subscribe({
          next: () => this.router.navigate(["users"]),
          error: (error) => this.popupComponent.openPopup(`Čuvanje izmena nije uspelo: ${error.error.message}`)
        }
      );
  }

  cancel(): void {
    this.router.navigate(["users"]);
  }

}
