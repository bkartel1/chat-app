import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Vars } from '../../global/vars';
 
@Injectable()
export class LecturesService {
 
    constructor(
        private http: HttpClient
    ) {}
 
    getNextLectures(): Promise<any> {
        return this
            .http
            .get(Vars.url + Vars.API_NEXT_LECTURES)
            .toPromise()
            .then(response => {
                return response;
            })
            .catch();
    }        
}