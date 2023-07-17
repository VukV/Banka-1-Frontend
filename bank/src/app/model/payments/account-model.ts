export interface AccountModel{
  id: number,
  accountNumber: string,
  ownerId: number,
  accountBalance: number,
  accountName: string,
  employeeId: string,
  defaultCurrencyCode: string,
  accountStatus: string,
  creationDate: string,
  expiryDate: string,
  accountType: string,
  interestRate: number,
  maintenanceCost: number
}
