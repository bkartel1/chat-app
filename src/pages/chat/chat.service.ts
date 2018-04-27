import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Vars } from '../../global/vars';
 
@Injectable()
export class ChatService {
 
    constructor(
        private http: HttpClient
    ) {}
 
    sendMessage(params): Promise<any> {
        return this
            .http
            .post(Vars.url + Vars.API_CONVERSATION, params)
            .toPromise()
            .then(response => {
                return response;
            })
            .catch();
    }        
}