import {UserRoleEnum} from "./user-role-enum";
import {UserPositionEnum} from "./user-position-enum";

export interface UserModel {
  //TODO change and refactor
  gender: string;
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  birthDate: string;
  homeAddress:string;
  jmbg: string,
  position: UserPositionEnum,
  phoneNumber: string,
  roles: UserRoleEnum[],
  active: boolean,
  dailyLimit: number
}

export interface BankUserModel {
  //TODO change and refactor
  id: number,
  firstName: string,
  lastName: string,
  birthDate: string,
  gender: string,
  email: string,
  phoneNumber: string,
  homeAddress: boolean,
  roles: string[],
}
