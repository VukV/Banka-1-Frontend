import {UserModel} from "../user/user-model";
import {CurrencyModel} from "./currency-model";

export interface AccountModel {
  reservedResources: any;
  id: number;
  accountNumber: string;
  ownerId: number;
  accountBalance: number[];
  accountName: string;
  employeeId: number;
  defaultCurrencyCode: string;
  accountStatus: string;
  creationDate: string;
  expiryDate: string;
  accountType: string;

}

export interface DevizniRacun extends AccountModel {
  vrstaRacuna: 'Devizni racun';
  racunZaIsplatuPlata: boolean;
}

export interface TekuciRacun extends AccountModel {
  vrstaRacuna: 'Tekuci racun';
  podvrstaRacuna: string; // lični, štedni, penzionerski, za mlade, itd.
}

export interface RacunZaPravnoLice extends AccountModel {
  vrstaRacuna: 'Racun za pravno lice';
  firma: string;
}
