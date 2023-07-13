export interface RecieverModel{
  id: number,
  senderId: string,
  receiverName: string,
  receiverAccountNumber: string,
  referenceNumber: string,
  paymentNumber: string,
  paymentPurpose: string

}

export interface UpdateReceiverModel{
  receiverName: string,
  receiverAccountNumber: string,
  referenceNumber: string,
  paymentNumber: string,
  paymentPurpose: string
}

