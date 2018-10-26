import { HomePage } from './../home/home';
import { Usuario } from './../../models/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';
import { RegisterServiceProvider } from '../../providers/register-service/register-service';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public name: string = '';
  public email: string = '';
  public password: string = '';
  public password_check: string = '';

  constructor(private _navCtrl: NavController,
    private _alerta: AlertController,
    private _registerService: RegisterServiceProvider,
    private _storage: Storage,
    private _loading: LoadingController) {
  }

  ionViewDidLoad() {

  }

  efetuarCadastro() {
    if (!this.name || !this.email || !this.password || !this.password_check) 
      return this._chamarAlerta('Campos vazios', 'Preencha todos os dados!')
      
    if (this.password != this.password_check)
      return this._chamarAlerta('Confirmação incorreta', 'Senhas não se coincidem!')
    //
    let loading = this._loading.create({
      content: 'Realizando cadastro...'
    });
    //
    loading.present();
    //
    let usuario: Usuario = {
      name: this.name,
      email: this.email,
      password: this.password
    }
    //
    this._registerService.registrar(usuario)
      .subscribe(
        res => {
          this._storage.set('token', res);
          this._storage.set('email', usuario.email);
          this._storage.set('password', usuario.password);
          loading.dismiss();
          this._alerta.create({
            title: 'Cadastro realizado com sucesso!',
            buttons: [
              {
                text: "OK",
                handler: () => {
                  this._navCtrl.setRoot(HomePage);
                }
              }
            ]
          }).present();
        },
        err =>  {
          console.log(err);
          loading.dismiss();
          this._chamarAlerta('Erro ao cadastrar', 'Falha no cadastro! Tente novamente mais tarde!');
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
}
