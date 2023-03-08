import {Component, OnInit} from '@angular/core';
import {User} from "../../../model/UserModel";
import {UserPositionEnum} from "../../../model/user-position-enum";
import {CurrentUserService} from "../../../services/current-user.service";
import {UserService} from "../../../services/user.service";

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

  constructor(private userService: UserService) {
    this.userService.loadAllUsers().subscribe((data) => {
      this.users = data;
    });
  }

  ngOnInit(): void {
  }

}
