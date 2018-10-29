import { Storage } from '@ionic/storage';
import { Info } from './../../models/info';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class InfosServiceProvider {
  //
  private _url = 'http://api-fingerprint.herokuapp.com/api';
  private _token;

  constructor(public http: HttpClient,
    private _storage: Storage) {
  }

  lista(token) {
    return this.http
        .get<Info>(this._url+'/v1/informacoes', {
          headers: {
            'content':"application/json",
            'contet-type':"application/x-www-form-urlencoded",
            Authorization: `${token}`
          }
        });
  }
}