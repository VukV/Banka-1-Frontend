export interface TransactionModel {
  id: number;
  senderId: number;
  receiverName: string;
  senderAccountNumber: string;
  receiverAccountNumber: string;
  amount: number;
  paymentTime: string;
  referenceNumber:string;

  paymentNumber:string;

  paymentPurpose:string;
  currencySymbol:string;
}
