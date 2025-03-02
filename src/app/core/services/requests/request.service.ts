import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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
            .pipe(
                map((res: any) => res.data),
                catchError(() => {
                    console.log('err')
                    return of(
                        {
                            pageInfo: {
                                totalPages: 10,
                                totalElements: 1000
                            },
                            pageContent: [
                                { name: '1', ddescription: '1' }
                            ]
                        }
                    );
                })
            );
    }


}
