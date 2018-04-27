import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Push } from '@ionic-native/push';

import { ChatPage } from '../pages/chat/chat';
import { VideosPage } from '../pages/videos/videos';
import { LecturesPage } from '../pages/lectures/lectures';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { ChatService } from '../pages/chat/chat.service';
import { LoginService } from '../pages/login/login.service';
import { VideosService } from '../pages/videos/videos.service';
import { LecturesService } from '../pages/lectures/lectures.service';
import { PushService } from '../global/push.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    ChatPage,
    VideosPage,
    LecturesPage,
    TabsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatPage,
    VideosPage,
    LecturesPage,
    TabsPage,
    LoginPage
  ],
  providers: [
    ChatService,
    LoginService,
    VideosService,
    LecturesService,
    PushService,
    Push,
    HttpClientModule,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
