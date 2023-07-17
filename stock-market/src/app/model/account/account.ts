export interface Account{
  _id: string,
  companyId: string,
  accountNumber: string,
  bankName: string,
  type: AccountType
}

export enum AccountType{
  DINARSKI = "DINARSKI",
  DEVIZNI = "DEVIZNI"
}
