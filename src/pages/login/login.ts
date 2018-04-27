import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginService } from './login.service';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  email: string;
  password: string;

  constructor(
    public navCtrl: NavController,
    private loginService: LoginService
  ) {
    
  }

  login() {
    var params = {
      email: this.email,
      password: this.password
    }
    this.loginService.login(params).then(result => {
      if (result.user) {
        localStorage.setItem('user', JSON.stringify(result.user));
        this.navCtrl.push(TabsPage);
      }
    }).catch( error => {

    });
  }
}