import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import { AuthService } from '../../services/requests/auth.service';
import { catchError, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authService.currentAuth$.pipe(
            map(authInfo => {
                if( !authInfo?.token ){
                    this.router.navigate(['auth/login']);
                }
                return authInfo?.token != undefined
            }),
            catchError((error) => {
                this.authService.logout();
                return of(false)
            })
        )
    }
}
