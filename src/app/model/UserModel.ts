import {UserPositionEnum} from "./user-position-enum";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userPosition: UserPositionEnum;
  isActive: boolean;
  phoneNumber: string;
}
