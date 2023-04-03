export interface Contract{
  id: number,
  delovodniBroj: string,
  status: string,
  kreiran: any,
  izmenjen: any
}

export interface Company{
  id: number,
  naziv: string,
  PIB: number,
  sifra: number,
  adresa: string,
  drzava: string
}
