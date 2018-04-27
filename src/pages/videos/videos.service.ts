import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Vars } from '../../global/vars';
 
@Injectable()
export class VideosService {
 
    constructor(
        private http: HttpClient
    ) {}
 
    getVideos(): Promise<any> {
        return this
            .http
            .get(`https://api.ustream.tv/channels/${Vars.ustreamChannelID}/videos.json`)
            .toPromise()
            .then(response => {
                return response;
            })
            .catch();
    }        
}