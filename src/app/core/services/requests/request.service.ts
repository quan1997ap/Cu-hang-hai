import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class RequestService {
    apiEndpoint = ``;
    constructor(private http: HttpClient) {
    }

    public getRequests(searchParams: any): Observable<any> {
        return this.http
            .get(`${this.apiEndpoint}`)
            .pipe(map((res: any) => res.data));
    }


}
