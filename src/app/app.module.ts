import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { PopupComponent } from './components/popup/popup.component';
import {NgxPaginationModule} from "ngx-pagination";
import { StocksComponent } from './components/stock-market/stocks/stocks.component';
import { ForexComponent } from './components/stock-market/forex/forex.component';
import { FuturesComponent } from './components/stock-market/futures/futures.component';
import { StockMainComponent } from './components/stock-market/stock-main/stock-main.component';
import { StockDetailComponent } from './components/stock-market/stock-detail/stock-detail.component';
import { ForexDetailComponent } from './components/stock-market/forex-detail/forex-detail.component';
import { TradesMainComponent } from './components/trades/trades-main/trades-main.component';
import { TradesComponent } from './components/trades/trades/trades.component';
import { TradesForexComponent } from './components/trades/trades-forex/trades-forex.component';
import { CapitalMainComponent } from './components/capital/capital-main/capital-main.component';
import { CapitalMarginComponent } from './components/capital/capital-margin/capital-margin.component';
import { CapitalCheckingComponent } from './components/capital/capital-checking/capital-checking.component';
import { MarginPopupComponent } from './components/capital/margin-popup/margin-popup.component';
import { CheckingPopupComponent } from './components/capital/checking-popup/checking-popup.component';
import { OptionsComponent } from './components/stock-market/options/options.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CompaniesComponent } from './components/companies/companies/companies.component';
import { CreateCompanyPopupComponent } from './components/companies/create-company-popup/create-company-popup.component';
import { ContractsComponent } from './components/contracts/contracts/contracts.component';
import { AddContractPopupComponent } from './components/contracts/add-contract-popup/add-contract-popup.component';

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
    StocksComponent,
    ForexComponent,
    FuturesComponent,
    StockMainComponent,
    StockDetailComponent,
    ForexDetailComponent,
    TradesMainComponent,
    TradesComponent,
    TradesForexComponent,
    CapitalMainComponent,
    CapitalMarginComponent,
    CapitalCheckingComponent,
    MarginPopupComponent,
    CheckingPopupComponent,
    OptionsComponent,
    OrdersComponent,
    CompaniesComponent,
    CreateCompanyPopupComponent,
    ContractsComponent,
    AddContractPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
