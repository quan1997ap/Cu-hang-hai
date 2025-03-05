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
                                { name: '56/TBHH-TCTBĐATHHMN 05-03-2025', description: 'Về thông số kỹ thuật của luồng hàng hải Phan Thiết' },
                                { name: '55/TBHH-TCTBĐATHHMN 05-03-2025', description: 'Về thông số kỹ thuật của vùng nước trước cầu cảng Container quốc tế SP-ITC của Công ty cổ phần Vận tải và Thương mại Quốc tế' },
                                { name: '56/TBHH-TCTBĐATHHMN 05-03-2025', description: 'Về thông số kỹ thuật của luồng hàng hải Phan Thiết' },
                                { name: '55/TBHH-TCTBĐATHHMN 05-03-2025', description: 'Về thông số kỹ thuật của vùng nước trước cầu cảng Container quốc tế SP-ITC của Công ty cổ phần Vận tải và Thương mại Quốc tế' },
                            ]
                        }
                    );
                })
            );
    }


}
