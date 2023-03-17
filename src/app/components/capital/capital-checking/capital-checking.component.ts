import { Component, OnInit } from '@angular/core';
import {PregledKapitala, TekuciRacun} from "../../../model/capital-checking";

@Component({
  selector: 'app-capital-checking',
  templateUrl: './capital-checking.component.html',
  styleUrls: ['./capital-checking.component.css']
})
export class CapitalCheckingComponent implements OnInit {

  racuni: TekuciRacun[] = []
  valuta: string= ""
  ukupnor: number=0
  rezervisano: number=0
  raspolozivo: number=0

  kapitali: PregledKapitala[] = []
  tipkapitala: string = ""
  ukupnok: number = 0
  constructor() {
  }

  ngOnInit(): void {
  }

}
