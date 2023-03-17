import { Component, OnInit } from '@angular/core';
import {MarzniRacun, PregledKapitala} from "../../../model/capital-checking";

@Component({
  selector: 'app-capital-margin',
  templateUrl: './capital-margin.component.html',
  styleUrls: ['./capital-margin.component.css']
})
export class CapitalMarginComponent implements OnInit {

  racuni: MarzniRacun[] = []
  valuta: string = ""
  ukupnom: number = 0
  kredit: number = 0
  maintenance: number = 0
  margincall: boolean = false

  kapitali: PregledKapitala[] = []
  tipkapitala: string = ""
  ukupnok: number = 0
  constructor() {
  }

  ngOnInit(): void {
  }

}
