import {Component, OnInit, ViewChild} from '@angular/core';
import {UserPositionEnum} from "../../../model/user-position-enum";
import {UserService} from "../../../services/user.service";
import {PopupComponent} from "../../popup/popup.component";
import {UserModel} from "../../../model/user-model";


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users: UserModel[] = [];
  allPositions: string[] = Object.values(UserPositionEnum);
  email: string = "";
  firstName: string = "";
  lastName: string = "";
  position: string = "";

  totalPages: number = 20;
  currentPage: number = 1;
  totalUsers: number = 0;
  page: number = 1;


  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
      this.searchUsers();
  }

  searchUsers(){
    this.userService.loadAllUsers(this.firstName, this.lastName, this.email, this.position, this.page-1).subscribe(
      (data) => {
        this.users = data.content;
        this.totalPages = data.totalPages;
        this.totalUsers = data.totalElements;
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
      }
    )
  }

  pageChangeEvent(event: number){
    this.page = event;
    this.searchUsers();
  }

}
