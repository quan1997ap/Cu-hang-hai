import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Injectable({
    providedIn: 'root',
})
export class APIService {
    public loginUrl = `${environment.apiUrl}/login`;
    public profileUrl = `${environment.apiUrl}/me`
}
