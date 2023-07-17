import {UserRoleEnum} from "./user-role-enum";
import {UserPositionEnum} from "./user-position-enum";
import {BankAccount} from "../capital/bank-account";

export interface UserModel {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  jmbg: string,
  position: UserPositionEnum,
  phoneNumber: string,
  roles: UserRoleEnum[],
  active: boolean,
  dailyLimit: number,
  bankAccount: BankAccount
}
