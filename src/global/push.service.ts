import { Injectable } from '@angular/core';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { ToastController, Events } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { Vars } from './vars';

@Injectable()
export class PushService {

    constructor(
        private push: Push,
        private toastCtrl: ToastController,
        public events: Events,
        private http: HttpClient
    ) {        
    }

    initPushNotification() {
        this.push.hasPermission()
        .then((res: any) => {        
            if (res.isEnabled) {
                // to initialize push notifications    
                const options: PushOptions = {
                    android: {
                        senderID: Vars.PUSH_NOTIFICATION_SENDER_ID
                    },
                    ios: {
                        alert: true,
                        badge: true,
                        sound: true
                    },
                    windows: {},
                    browser: {
                        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
                    }
                };
        
                const pushObject: PushObject = this.push.init(options);
                
                if (JSON.parse(localStorage.getItem('user')).hasDeviceToken == false) {
                    pushObject.on('registration').subscribe((registration: any) => {
                        var email = JSON.parse(localStorage.getItem('user')).email;
                        this.updateUserDeviceToken({email: email, device_token: registration.registrationId})
                            .then((response: any) => {
                                if (response.error == false) {
                                    console.log('Device registered', registration);
                                    var user = JSON.parse(localStorage.getItem('user'));
                                    user.hasDeviceToken = true;
                                    localStorage.setItem('user', JSON.stringify(user));
                                }
                            }).catch();
                    });
                }
                
                pushObject.on('notification').subscribe((data: any) => {
                    console.log('Received a notification', data);
                    // note: only one account for each device allowed
                    if (data.additionalData.foreground != false && localStorage.getItem('user')) {
                        if (data.additionalData.tag == "reminder")
                            this.presentToast(data.additionalData.text);
                        if (data.additionalData.tag == "feedback")
                            this.presentToast(data.title);
                    }

                    if (data.additionalData.tag == "reminder")                        
                        this.events.publish('displayMessage',data.additionalData.text,true);
                    if (data.additionalData.tag == "feedback")
                        this.events.publish('lectureFeedback');
                });
            }
        });
    }

    updateUserDeviceToken(params) {
        return this
            .http
            .post(Vars.url + Vars.API_UPDATE_DEVICE_TOKEN, params)
            .toPromise()
            .then(response => {
                return response;
            })
            .catch();
    }

    presentToast(message) {
        let toast = this.toastCtrl.create({
          message: "Avatar: " + message,
          duration: 4000,
          position: 'top'
        });
      
        toast.present();
    }
}
