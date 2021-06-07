import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'mu-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {
  }

  userName = JSON.parse(<string>localStorage.getItem("currentUser")).userName || "";

  ngOnInit(): void {
  }

  logout(): void {
    localStorage.removeItem("currentUser")
    localStorage.setItem("loginStatus", "false");
    this.router.navigate(['/welcome']);
  }

}
