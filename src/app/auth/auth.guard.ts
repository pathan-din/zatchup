import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,

  ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.isLoggedIn())
      this.router.navigate(['admin/login']);

    return this.isLoggedIn();
  }

  canLoad(route: Route): boolean {
    let moduleList: any;
    if (sessionStorage.getItem('permissions')) {
      moduleList = JSON.parse(sessionStorage.getItem('permissions'))
    }
    return true
  }

  isLoggedIn() {
    // if (localStorage.getItem('token'))
    //   return true;
    // else
    //   return false
    return !!localStorage.getItem("token");
  }
}
