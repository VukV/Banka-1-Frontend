import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginGuard} from "./guards/login.guard";
import {ListUsersComponent} from "./components/users/list-users/list-users.component";
import {AddUserComponent} from "./components/users/add-user/add-user.component";
import {UpdateUserComponent} from "./components/users/update-user/update-user.component";
import {MyProfileComponent} from "./components/users/my-profile/my-profile.component";
import {LoginComponent} from "./components/users/login/login.component";
import {
  ResetPasswordRequestComponent
} from "./components/users/reset-password-request/reset-password-request.component";
import {ResetPasswordComponent} from "./components/users/reset-password/reset-password.component";
import {ActivatePasswordComponent} from "./components/users/activate-password/activate-password.component";
import {UserRoleEnum} from "./model/user/user-role-enum";

import {HomePageComponent} from "./components/home-page/home-page.component";
import {AccountsComponent} from "./components/accounts/accounts/accounts.component";
import {
  CreateAccountMainComponent
} from "./components/accounts/create-account/create-account-main/create-account-main.component";
import {
  CreateBussinessAccountComponent
} from "./components/accounts/create-account/create-bussiness-account/create-bussiness-account.component";
import {
  CreateForeignCurrencyAccountComponent
} from "./components/accounts/create-account/create-foreign-currency-account/create-foreign-currency-account.component";
import {
  CreateCurrentAccountComponent
} from "./components/accounts/create-account/create-current-account/create-current-account.component";
import {LegalPersonsComponent} from "./components/legal-persons/legal-persons.component";
import {NaturalPersonsComponent} from "./components/natural-persons/natural-persons.component";
import {CreateCompanyComponent} from "./components/legal-persons/create-company/create-company.component";
import {AddAccountComponent} from "./components/users/add-account/add-account.component";



const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [LoginGuard]
  },
  {
    path: "home-page",
    component: HomePageComponent,
    canActivate: [LoginGuard]
  },
  {
    path: "users",
    component: ListUsersComponent,
    canActivate: [LoginGuard],
    data: {roles: [UserRoleEnum.ROLE_EMPLOYEE]}
  },
  {
    path: "add-user",
    component: AddUserComponent,
    canActivate: [LoginGuard],
    data: {roles: [UserRoleEnum.ROLE_EMPLOYEE]}
  },
  {
    path: "add-account",
    component: AddAccountComponent,
    canActivate: [LoginGuard],
    data: {roles: [UserRoleEnum.ROLE_EMPLOYEE]}
  },
  {
    path: "update-user/:userId",
    component: UpdateUserComponent,
    canActivate: [LoginGuard],
    data: {roles: [UserRoleEnum.ROLE_EMPLOYEE]}
  },
  {
    path: "my-profile",
    component: MyProfileComponent,
    canActivate: [LoginGuard]
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "reset-password-request",
    component: ResetPasswordRequestComponent,
  },
  {
    path: "activate-password/:userId",
    component: ActivatePasswordComponent,
  },
  {
    path: "reset-password/:userId",
    component: ResetPasswordComponent,
  },
  {
    path: "accounts",
    component: AccountsComponent,
  },
  {
    path: "create-new-account",
    component: CreateAccountMainComponent,
  },
  {
    path: "create-current-account",
    component: CreateCurrentAccountComponent,
  },
  {
    path: "create-foreign-currency-account",
    component: CreateForeignCurrencyAccountComponent,
  },
  {
    path: "create-bussiness-account",
    component: CreateBussinessAccountComponent,
  },
  {
    path: "natural-persons",
    component: NaturalPersonsComponent,
  },
  {
    path: "legal-persons",
    component: LegalPersonsComponent,
  },
  {
    path: "create-company",
    component: CreateCompanyComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}