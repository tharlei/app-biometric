import { InfosServiceProvider } from './../../providers/infos-service/infos-service';
import { Storage } from '@ionic/storage';
import { LoginServiceProvider } from './../../providers/login-service/login-service';
import { Login } from './../../models/login';
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public armazenado: boolean = false;
  public email: string = '';
  public password: string = '';

  constructor(private _navCtrl: NavController,
    private _alerta: AlertController,
    private _loginService: LoginServiceProvider,
    private _storage: Storage,
    private _loading: LoadingController,
    private _finger: FingerprintAIO,
    private _infosService: InfosServiceProvider) {
  }

  ionViewDidLoad() {
    this._storage.get('email').then(val => {
      if (val) {
        this.email = val;
        this._finger.isAvailable().then(res => {
          this.armazenado = true;
        })
        .catch(err => console.log(err));
      }
    });
    this._storage.get('password').then(val => {
      if (val) {
        this.password = val;
        this._finger.isAvailable().then(res => {
          this._chamarAlerta('finger', res);
          this.armazenado = true;
        })
        .catch(err => console.log(err));
      }
    });
  }

  efetuarLogin() {
    if (!this.email || !this.password) 
      return this._chamarAlerta('Campos vazios', 'Preencha todos os dados!')
    
    let loading = this._loading.create({
      content: 'Autenticando...'
    });
    //
    loading.present();
    //
    let usuario: Login = {
      email: this.email,
      password: this.password
    }

    this._loginService.acessar(usuario)
    .subscribe(
      res => {
        this._storage.set('token', (res['token_type'] + " " + res['access_token']));
        this._storage.set('email', usuario.email);
        this._storage.set('password', usuario.password);
        this._infosService.lista()
          .subscribe(res => {
            loading.dismiss();
            this._navCtrl.setRoot(HomePage, {
              informacoes: res
            });
          },
          err => {
            console.log(err);
            loading.dismiss();
            this._chamarAlerta("Erro na informações", "Não foi possivel obter informações!");
          });
      },
      err =>  {
        console.log(err);
        loading.dismiss();
        this._chamarAlerta('Erro na autenticação', 'E-mail ou senha incorreto!');
        return false;
      }
    );
  }

  _chamarAlerta(titulo: string, msg: string) {
    this._alerta.create({
      title: titulo,
      subTitle: msg,
      buttons: [
        { text: 'OK' }
      ]
    }).present();

    return [{'erro':true, 'msg':msg}];
  }

  reset() {
    this._storage.remove('email');
    this._storage.remove('password');
    this.armazenado = false
    this.email = '';
    this.password = '';
  }

  autenticacao() {
    this._finger.show({
      clientId: 'aps-biometria',
      clientSecret: 'password', 
      disableBackup:true,  
      localizedFallbackTitle: 'Use Pin', 
      localizedReason: 'Please authenticate' 
  })
  .then((result: any) => (result == 'OK' ? this.efetuarLogin() : ''))
  .catch((error: any) => console.log(error));
  }
}
