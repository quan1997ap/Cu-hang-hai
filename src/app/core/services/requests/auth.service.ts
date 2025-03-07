import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthResponse, TAuthInfo } from '../../models/auth.model';
import { APIService } from './api.service';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends APIService {

  currentAuth$: BehaviorSubject<TAuthInfo> = new BehaviorSubject<TAuthInfo>(undefined);
  public authLocalStorageKey = `${environment.appVersion}-auth`;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    super();
  }

  get currentAuthInfo() {
    return this.currentAuth$.value;
  }

  set currentAuthInfo(user: TAuthInfo) {
    this.currentAuth$.next(user);
  }


  login(email: string, password: string,) {
    return this.http.post<IAuthResponse>(
      `${this.loginUrl}`, { "email": email, "password": password},
    ).pipe(
      tap( (res: IAuthResponse) => {
        this.setAuthToLocalStorage(res);
        this.currentAuth$.next(res);
      })
    )
  }

  getProfile(){
    return this.http.get<IAuthResponse>( `${this.profileUrl}`)
  }

  private setAuthToLocalStorage(auth: TAuthInfo) {
    localStorage.setItem(this.authLocalStorageKey, JSON.stringify(auth));
  }

  isAuthenticated() {
    const authInfo = JSON.parse(localStorage.getItem(this.authLocalStorageKey) || '');
    this.currentAuth$.next(authInfo);
  }

  logout(){
    this.currentAuth$.next(undefined);
    this.router.navigate(['auth/login']);
  }

}
