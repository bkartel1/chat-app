import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

import { ChatPage } from '../chat/chat';
import { VideosPage } from '../videos/videos';
import { LecturesPage } from '../lectures/lectures';

import { PushService } from '../../global/push.service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = LecturesPage;
  tab2Root = ChatPage;
  tab3Root = VideosPage;

  constructor(
    private platform: Platform, 
    private pushService: PushService
  ) {
    if (this.platform.is('cordova') || this.platform.is('android'))
        this.pushService.initPushNotification();
      else
        console.warn('Push Notification Service will only work when Cordova is available.');
  }
}
