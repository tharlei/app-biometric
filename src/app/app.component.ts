import { Storage } from '@ionic/storage';
import { UserServiceProvider } from './../providers/user-service/user-service';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) public nav: Nav;
  rootPage:any = LoginPage;

  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private _userService: UserServiceProvider,
    private _storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  get usuarioLogado() {
    return this._userService.logado();
  }

  exit() {
    this._storage.remove('token');
    this._userService.deslogar();
    this.nav.setRoot(LoginPage);
  }
}

