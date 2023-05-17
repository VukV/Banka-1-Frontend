import {Transaction} from "./contract";

export class ContractRequest {
  companyId: number;
  referenceNumber: string;
  description: string;
  transactions: Transaction[];

  constructor(companyId: number, referenceNumber: string, description: string, transactions: Transaction[]) {
    this.companyId = companyId;
    this.referenceNumber = referenceNumber;
    this.description = description;
    this.transactions = transactions;
  }
}
