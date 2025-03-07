import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../../services/requests/auth.service';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authService.currentAuth$.pipe(
            tap(authInfo => {
                if (!authInfo?.token) {
                    this.authService.logout();
                }
            }),
            map(authInfo => authInfo?.token != undefined),
            catchError((error) => {
                this.authService.logout();
                return of(false)
            })
        )
    }
}
