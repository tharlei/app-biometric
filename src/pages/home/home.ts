import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private _navCtrl: NavController,
    private _storage: Storage) {

  }

  exit() {
    this._storage.remove('token');
    this._navCtrl.setRoot(LoginPage.name);
  }
}
