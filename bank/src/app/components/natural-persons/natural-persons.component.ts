import {Component, ViewChild} from '@angular/core';
import {UserModel} from "../../model/user/user-model";
import {ActivatedRoute, Router} from "@angular/router";
import {UserPositionEnum} from "../../model/user/user-position-enum";
import {UserRoleEnum} from "../../model/user/user-role-enum";
import {UserService} from "../../services/user/user.service";
import {PopupComponent} from "../popup/popup/popup.component";

@Component({
  selector: 'app-natural-persons',
  templateUrl: './natural-persons.component.html',
  styleUrls: ['./natural-persons.component.css']
})
export class NaturalPersonsComponent {
  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  naturalPersons: UserModel[] = [];
  email: string = "";
  ime: string = "";
  prezime: string = "";
  datumRodjenja: string = "";
  private previousUrl: string = "";

  page: number = 1;
  usersPerPage: number = 6;
  error: string = "";

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.listNaturalPersons()
    this.previousUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  onRowSelect(selectedObject: any) {
    const queryParams = {
      objectId: selectedObject.id,
    };
    this.route.queryParams.subscribe(params => {
      let returnUrl = params['returnUrl'];
      if (returnUrl) {
        let returnUrl2 = decodeURIComponent(this.route.snapshot.queryParams['returnUrl']);
        returnUrl = returnUrl2.split('%')[0]; // Cut off at the first occurrence of '%'

        this.router.navigate([returnUrl], {queryParams});
      }

    });
  }

  createUser() {
    this.router.navigate(["add-user"])
  }

  listNaturalPersonsFiltered() {
    this.userService.loadAllUsersFiltered(this.ime, this.prezime, this.email, this.datumRodjenja).subscribe(
      (users) => {
        this.naturalPersons = users;
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
      }
    )
  }

  listNaturalPersons() {
    this.userService.loadAllUsers().subscribe(
      (users) => {
        this.naturalPersons = users;
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
      }
    )
  }
}
