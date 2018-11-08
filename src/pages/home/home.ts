import { InfoPage } from './../info/info';
import { Info } from './../../models/info';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public infos: Info[];

  constructor(private _navCtrl: NavController,
    private _navParams: NavParams,
    private _storage: Storage) {
      this.infos = this._navParams.get('informacoes');
  }

  ionViewDidLoad() {
  }

  selecionaInfo(info: Info) {
    this._navCtrl.push(InfoPage, {
      infoSelecionada: info
    });
  }
}
