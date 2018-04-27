import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Vars } from '../../global/vars';
 
@Injectable()
export class LoginService {
 
    constructor(
        private http: HttpClient
    ) {}
 
    login(params): Promise<any> {
        return this
            .http
            .post(Vars.url + Vars.API_LOGIN, params)
            .toPromise()
            .then(response => {
                return response;
            })
            .catch();
    }        
}