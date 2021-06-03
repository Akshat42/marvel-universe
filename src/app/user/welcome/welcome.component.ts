import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'mu-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }
  public pageTitle = "Welcome to the Marvel Universe";
  goToLogin(){
    this._router.navigate([{outlets: {loginPage: ['login']}}]);
  }
}
