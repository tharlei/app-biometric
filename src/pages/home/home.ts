import { InfosServiceProvider } from './../../providers/infos-service/infos-service';
import { InfoPage } from './../info/info';
import { Info } from './../../models/info';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public infos: Info[];

  constructor(private _navCtrl: NavController,
    private _navParams: NavParams,
    private _storage: Storage,
    private _infoService: InfosServiceProvider,
    private _alerta: AlertController) {
      this.infos = this._navParams.get('informacoes');
  }

  ionViewDidLoad() {
  }

  selecionaInfo(info: Info) {
    this._navCtrl.push(InfoPage, {
      infoSelecionada: info
    });
  }

  doRefresh(refresher) {
    this._storage.get('token')
      .then(
        token => {
          this._infoService.lista(token)
            .subscribe(
              res => {
                this.infos = res;
                refresher.complete();
              },
              err => {
                this._chamarAlerta('Erro recarregamento', 'Falha com conexão com servidor, tente novamente mais tarde!', err);
                refresher.complete();
              }
            )
        }
      )
  }

  _chamarAlerta(titulo: string, subtitle: string, erro: string = titulo) {
    this._alerta.create({
      title: titulo,
      subTitle: subtitle,
      buttons: [
        { text: 'OK' }
      ]
    }).present();

    return [{'erro':true, 'msg':erro}];
  }
}
