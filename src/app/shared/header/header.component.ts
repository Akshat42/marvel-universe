import {Component, OnInit} from '@angular/core';
import {AppRoutingModule} from "../../app-routing.module";
import {Router} from "@angular/router";

@Component({
  selector: 'mu-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {
  }

  userName = localStorage.getItem("username");

  ngOnInit(): void {
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }

}
