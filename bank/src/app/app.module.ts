import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// @ts-ignore
import { NgApexchartsModule } from "ng-apexcharts";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/users/login/login.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { ActivatePasswordComponent } from './components/users/activate-password/activate-password.component';
import { MyProfileComponent } from './components/users/my-profile/my-profile.component';
import { ResetPasswordComponent } from './components/users/reset-password/reset-password.component';
import { ResetPasswordRequestComponent } from './components/users/reset-password-request/reset-password-request.component';
import { UpdateUserComponent } from './components/users/update-user/update-user.component';
import { HomeComponent } from './components/home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { PopupComponent } from './components/popup/popup/popup.component';
import {NgxPaginationModule} from "ngx-pagination";
import {CountUpModule} from "ngx-countup";
import {ngxLoadingAnimationTypes, NgxLoadingModule} from "ngx-loading";
import { ConfirmationPopupComponent } from './components/popup/confirmation-popup/confirmation-popup.component';
import {NgToggleModule} from "ng-toggle-button";
import {LottieModule} from "ngx-lottie";
import player from 'lottie-web';
import {DatePipe, NgForOf, NgSwitchCase} from "@angular/common";
import { HomePageComponent } from './components/home-page/home-page.component';
import { AccountsComponent } from './components/accounts/accounts/accounts.component';
import { AccountDetailComponent } from './components/accounts/accounts/account-details/account-detail/account-detail.component';
import { CreateAccountMainComponent } from './components/accounts/create-account/create-account-main/create-account-main.component';
import { CreateBussinessAccountComponent } from './components/accounts/create-account/create-bussiness-account/create-bussiness-account.component';
import { CreateCurrentAccountComponent } from './components/accounts/create-account/create-current-account/create-current-account.component';
import { CreateForeignCurrencyAccountComponent } from './components/accounts/create-account/create-foreign-currency-account/create-foreign-currency-account.component';
import { NaturalPersonsComponent } from './components/natural-persons/natural-persons.component';
import { LegalPersonsComponent } from './components/legal-persons/legal-persons.component';
import { CreateCompanyComponent } from './components/legal-persons/create-company/create-company.component';


export function playerFactory() {
  return player;
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListUsersComponent,
    AddUserComponent,
    ActivatePasswordComponent,
    MyProfileComponent,
    ResetPasswordComponent,
    ResetPasswordRequestComponent,
    UpdateUserComponent,
    HomeComponent,
    PopupComponent,
    ConfirmationPopupComponent,
    HomePageComponent,
    AccountsComponent,
    AccountDetailComponent,
    CreateAccountMainComponent,
    CreateBussinessAccountComponent,
    CreateCurrentAccountComponent,
    CreateForeignCurrencyAccountComponent,
    NaturalPersonsComponent,
    LegalPersonsComponent,
    CreateCompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    CountUpModule,
    NgApexchartsModule,
    NgToggleModule.forRoot(),
    NgxLoadingModule.forRoot({
      backdropBorderRadius: '3px',
      primaryColour: '#00B127',
      secondaryColour: '#00B127',
      tertiaryColour: '#00B127',
      animationType: ngxLoadingAnimationTypes.wanderingCubes
    }),
    LottieModule.forRoot({player: playerFactory}),
    NgSwitchCase,
    FormsModule,
    NgForOf,
    NgxLoadingModule,
    ReactiveFormsModule,
    NgForOf,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
