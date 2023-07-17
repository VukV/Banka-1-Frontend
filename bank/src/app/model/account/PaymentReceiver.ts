export interface PaymentReceiver {
  id: number;
  senderId: number;
  receiverName: string;
  receiverAccountNumber: string;
  referenceNumber: string;
  paymentNumber: string;
  paymentPurpose: string;
}
