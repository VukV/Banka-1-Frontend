import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../model/UserModel";
import {UserPositionEnum} from "../../../model/user-position-enum";
import {CurrentUserService} from "../../../services/current-user.service";
import {UserService} from "../../../services/user.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {PopupComponent} from "../../popup/popup.component";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users: User[] = [
    {
      id: -1,
      firstName: '',
      lastName: '',
      email: '',
      userPosition: UserPositionEnum.Manager,
      isActive: false,
      phoneNumber: '',
    },
  ];

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  constructor(private userService: UserService) {
    this.userService.loadAllUsers().subscribe((data) => {
      this.users = data;
      },
       (error) => {
        this.popupComponent.openPopup(error.message());
      }
    )
  }

  ngOnInit(): void {
  }

}
