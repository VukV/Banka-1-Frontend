export interface Contract {
  _id: string,
  companyId: number,
  agentId: number,
  status: ContractStatus,
  createdDateTime: string,
  modifiedDateTime: string,
  referenceNumber: string,
  description: string,
  transactions: Transaction[]
}

export interface Transaction {
  action: TransactionAction,
  symbol: string,
  quantity: number,
  price: number
}

export enum ContractStatus {
  DRAFT = 'DRAFT',
  FINAL = 'FINAL'
}

export enum TransactionAction {
  BUY = "BUY",
  SELL = "SELL"
}
