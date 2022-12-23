import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';


import { Observable } from 'rxjs';
import { UserData } from './user-data';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private data: UserData) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    return this.data.isLoggedIn().then((value) => {
      if (!(value === true)) {
        this.router.navigate(['/login'])
      }
      return value === true;
    });
  }

}
