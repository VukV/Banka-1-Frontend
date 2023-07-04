export interface ContactRequest {
  companyId: string,
  fullName: string,
  phoneNumber: string,
  email: string,
  position: string,
  note: string
}

export interface UpdateContactRequest{
  fullName: string,
  phoneNumber: string,
  email: string,
  position: string,
  note: string
}
