import { Info } from './../../models/info';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class InfosServiceProvider {
  //
  private _url = 'http://api-fingerprint.herokuapp.com/api';
  private _options = {
    headers: {
      'content':"application/json",
      'contet-type':"application/x-www-form-urlencoded"
    }
  };

  constructor(public http: HttpClient) {
  }

  lista() {
    return this.http
        .get<Info>(this._url+'/v1/informacoes', this._options);
  }
}