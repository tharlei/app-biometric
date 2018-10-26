import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario';

@Injectable()
export class RegisterServiceProvider {
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

  registrar(usuario: Usuario) {
    return this.http
        .post<Usuario>(this._url+'/register', usuario, this._options);
  }
}
