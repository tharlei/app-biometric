import { InfoPage } from './../pages/info/info';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterServiceProvider } from '../providers/register-service/register-service';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage'
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { LoginPage } from '../pages/login/login';
import { InfosServiceProvider } from '../providers/infos-service/infos-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    InfoPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    InfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RegisterServiceProvider,
    LoginServiceProvider,
    FingerprintAIO,
    InfosServiceProvider 
  ]
})
export class AppModule {}
