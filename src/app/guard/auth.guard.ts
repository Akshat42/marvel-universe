import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../user/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  flag: boolean=false;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.flag = this.checkLoggedIn(state.url);
    return this.flag;
  }

  checkLoggedIn(url: string): boolean {
    if (this.authService.isLoggedIn) {
      this.flag=true;
      return this.flag;
    }
    this.authService.redirectUrl = url;
    this.router.navigate(['/welcome']);
    this.flag=false;
    return this.flag;
  }
}
