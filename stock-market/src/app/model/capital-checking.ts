export interface TekuciRacun{
  id: number,
  valuta: string,
  ukupnor: number,
  rezerivsano: number,
  raspolozivo: number
}

export interface PregledKapitala{
  tipkapitala: string,
  ukupnok: number
}

export interface MarzniRacun{
  id: number,
  valuta: string,
  ukupnom: number,
  kredit: number,
  maintenance: number
  margincall: boolean
}
