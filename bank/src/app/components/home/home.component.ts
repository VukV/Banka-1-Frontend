import {Component, OnInit, ViewChild} from '@angular/core';
import {PopupComponent} from "../popup/popup/popup.component";
import {AnimationOptions} from "ngx-lottie";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  showHelp: boolean = false;

  options: AnimationOptions = {
    path: '/assets/lottie/stock-animation.json',

  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  continueFromHomePage(){
    //TODO navigate
    this.router.navigate(['']);
  }
}
