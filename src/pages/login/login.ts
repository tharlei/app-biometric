import { Storage } from '@ionic/storage';
import { LoginServiceProvider } from './../../providers/login-service/login-service';
import { Usuario } from './../../models/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public email: string = '';
  public password: string = '';

  constructor(private _navCtrl: NavController,
    private _alerta: AlertController,
    private _loginService: LoginServiceProvider,
    private _storage: Storage,
    private _loading: LoadingController) {
  }

  ionViewDidLoad() {
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
    let usuario: Usuario = {
      name: null,
      email: this.email,
      password: this.password
    }

    this._loginService.acessar(usuario)
    .subscribe(
      res => {
        this._storage.set('token', res);
        this._storage.set('email', usuario.email);
        this._storage.set('password', usuario.password);
        loading.dismiss();
        this._navCtrl.setRoot(HomePage);
      },
      err =>  {
        console.log(err);
        loading.dismiss();
        this._chamarAlerta('Erro na autenticação', 'E-mail ou senha incorreto!');
        return false;
      }
    );
  }

  irCadastro() {
    this._navCtrl.push(RegisterPage.name);
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
}
