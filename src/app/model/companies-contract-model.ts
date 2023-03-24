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

export interface Order{
  id: number,
  hartija: string,
  ukupno: string,
  simbol: string,
  kolicina: number,
  cena: number,
  status: string,
  zavrsena: string,
  modifikacija: any,
}
