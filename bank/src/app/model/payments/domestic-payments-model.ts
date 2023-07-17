export interface PaymentModel{
  recieverName: string,
  senderAccountNumber: string,
  receiverAccountNumber: string,
  amount: string,
  referenceNumber: string,
  paymentNumber: string,
  paymentPurpose: string
}

export interface DomesticPaymentModel{
  id: string,
  senderId: string,
  recieverName: string,
  senderAccountNumber: string,
  receiverAccountNumber: string,
  amount: string,
  paymentTime: string,
  referenceNumber: string,
  paymentNumber: string,
  paymentPurpose: string,
  currencySymbol: string
}



