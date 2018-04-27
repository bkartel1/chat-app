import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { VideosService } from './videos.service';

@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html'
})
export class VideosPage {

  private videos = [];

  constructor(
    public navCtrl: NavController,
    private videosService: VideosService
  ) {
    this.getVideos();
  }

  getVideos() {
    this.videosService.getVideos().then(result => {
      for (var i in result.videos) {
        this.videos.push(result.videos[i]);
      }
    }).catch(error => {

    });
  }

}
