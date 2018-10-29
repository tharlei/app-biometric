import { Info } from './../../models/info';
import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  public info: Info;

  constructor(private _navParams: NavParams) {
      this.info = this._navParams.get('infoSelecionada');
  }

  ionViewDidLoad() {
  }

}
