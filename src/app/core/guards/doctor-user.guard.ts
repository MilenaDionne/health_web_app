import {Injectable, Input} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../../core/services/auth.service';
import {take, tap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DoctorUserGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.getUser.pipe(
      take(1),
      map(user => user && user.role === 'Doctor' ? true : false),
      tap(isDoctor => {
        if (!isDoctor) {
          console.error('not a doctor');
        }
      })

    );
  }
}
