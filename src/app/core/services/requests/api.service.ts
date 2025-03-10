import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class APIService {
    public loginUrl = `${environment.apiUrl}/login`;
    public profileUrl = `${environment.apiUrl}/me`;
    public usersUrl = `${environment.apiUrl}/users`;
}
