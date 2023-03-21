import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-capital-main',
  templateUrl: './capital-main.component.html',
  styleUrls: ['./capital-main.component.css']
})
export class CapitalMainComponent implements OnInit {

  active: string = 'btn1';
  constructor() { }

  ngOnInit(): void {
  }

  onButtonClick(btn: string){
    this.active = btn
  }

}
