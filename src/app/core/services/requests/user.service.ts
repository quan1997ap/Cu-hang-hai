import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { APIService } from './api.service';
import { ListDataRequest } from '../../models/request.model';
import { URLNoEncoder } from './url-no-encode';
import { User, UserUpdatePayload } from '../../models/user.model';
import { IListResponse } from '../../models/response.model';

@Injectable({
    providedIn: 'root',
})
export class UserService extends APIService {
    constructor(private http: HttpClient) {
        super();
    }

    getUsers(searchParams: ListDataRequest | any){
        let queryParams = new HttpParams({ encoder: new URLNoEncoder() });
        Object.keys(searchParams).forEach((key: string) => {
            queryParams = queryParams.append(key, searchParams[key]);
        })
        return this.http
            .get<IListResponse<User>>(`${this.usersUrl}`, { params: queryParams })
    }

    public addUser(user: UserUpdatePayload) {
        return this.http.post(`${this.usersUrl}`, user).pipe(map((res) => res));
    }

    public editUser(id: number, user: UserUpdatePayload) {
        return this.http.put(`${this.usersUrl}/${id}`, user).pipe(map((res) => res));
    }


    removeUser(id: number): Observable<any> {
        return this.http.delete(`${this.usersUrl}/${id}`).pipe(map((res) => res));
    }


}
