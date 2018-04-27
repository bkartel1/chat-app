import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LecturesService } from './lectures.service';

@Component({
  selector: 'page-lectures',
  templateUrl: 'lectures.html'
})
export class LecturesPage {

  private nextLectures = [];

  constructor(
    public navCtrl: NavController,
    private lecturesService: LecturesService
  ) {
    this.getNextLectures();
  }

  getNextLectures() {
    this.lecturesService.getNextLectures().then(result => {
      for (var i in result) {
        this.nextLectures.push(result[i]);
      }
    }).catch(error => {
      
    });
  }

}
