import { Info } from './../../models/info';
import { UserServiceProvider } from './../../providers/user-service/user-service';
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
  public name: string = '';

  constructor(private _navCtrl: NavController,
    private _alerta: AlertController,
    private _loginService: LoginServiceProvider,
    private _storage: Storage,
    private _loading: LoadingController,
    private _finger: FingerprintAIO,
    private _infosService: InfosServiceProvider,
    private _userService: UserServiceProvider) {
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
    .timeout(20000)
    .subscribe(
      res => {
        let token = (res['token_type'] + " " + res['access_token']);
        this._storage.set('token', token);
        this._storage.set('email', usuario.email);
        this._storage.set('password', usuario.password);
        this._infosService.lista(token)
          .timeout(20000)
          .subscribe(res => {
            loading.dismiss();
            let infos: Info[] = res;
            this._userService.sobre(token)
              .timeout(20000)
              .subscribe(() => {
                loading.dismiss();
                this._navCtrl.setRoot(HomePage, {
                  informacoes: infos
                });
              },
              err => {
                console.log(err);
                loading.dismiss();
                return this._chamarAlerta("Erro na usuário", "Não foi possivel obter usuário. Tente novamente mais tarde!", err);
              });
          },
          err => {
            console.log(err);
            loading.dismiss();
            return this._chamarAlerta("Erro na informações", "Não foi possivel obter noticias. Tente novamente mais tarde!", err);
          });
      },
      err =>  {
        console.log(err);
        loading.dismiss();
        return this._chamarAlerta('Erro na autenticação', 'Não foi possível autenticar. Tente novamente mais tarde!', err);
      }
    );
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

  reset() {
    this._storage.remove('email');
    this._storage.remove('password');
    this.armazenado = false
    this.email = '';
    this.password = '';
  }

  autenticacao() {
    this._finger.show({
      clientId: 'nature-news',
      clientSecret: 'password', 
      disableBackup:true,  
      localizedFallbackTitle: 'Use Pin', 
      localizedReason: 'Please authenticate' 
  })
  .then((res: any) => this.efetuarLogin())
  .catch((err: any) => this._chamarAlerta('Erro na autenticação', 'Não foi possível autenticar. Houve alguma falha com biometria!', err));
  }

  get usuarioLogado() {
    return this._userService.logado();
  }
}
