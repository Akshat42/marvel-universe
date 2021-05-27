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
    let status;
    if (this.authService.isLoggedIn) {
      status=true;
    }
    else{
      this.authService.redirectUrl = url;
      this.router.navigate(['/welcome']);
      status=false;
    }
    return status;
  }
}
