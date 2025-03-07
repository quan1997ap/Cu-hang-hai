
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent,
    HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent
} from '@angular/common/http';
import { AuthService } from '../../services/requests/auth.service';
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    urlsShouldNoteAddToken = [
        '/login'
    ]; // api of CALL-CENTER VNPT

    constructor(
        private authService: AuthService
    ) {
    }
    // add custom headers
    addHeaders(req: HttpRequest<any>): HttpRequest<any> {
        const authInfo = this.authService.currentAuthInfo;
        return req.clone({
            setHeaders: {
                Authorization: `${authInfo?.token}`
            }
        });
    }


    // intercept requests
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse
        | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        // check if url should encrypt or not
        let noAddToken = false;
        let newRequest;
        this.urlsShouldNoteAddToken.forEach(url => {
            if (req.url.includes(url)) {
                noAddToken = true;
            }
        })
        if (!noAddToken) {
            newRequest = this.addHeaders(req);
        } else {
            newRequest = req;
        }
        return next.handle(newRequest);
    }
}
