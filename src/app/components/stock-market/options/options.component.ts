import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PopupComponent} from "../../popup/popup/popup.component";
import {StocksService} from "../../../services/stocks/stocks.service";

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  symbol: string = "";
  loading: boolean = false;

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  constructor(private route: ActivatedRoute, private stocksService: StocksService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.symbol = params['symbol'];
      this.getOptions()
    });
  }

  getOptions(){
    this.loading = false;
    this.stocksService.getOptions().subscribe(
      (data) => {
        //TODO
        this.loading = false;
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
        this.loading = false;
      }
    )
  }

}
