import { User } from './../../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserServiceProvider {

  private _url = 'http://api-fingerprint.herokuapp.com/api';
  public user: User = {
    name: '',
    email: '',
    level: 0
  };

  constructor(public http: HttpClient) {
  }

  sobre(token) {
    return this.http
        .get<User>(this._url+'/user', {
          headers: {
            'content':"application/json",
            'contet-type':"application/x-www-form-urlencoded",
            Authorization: `${token}`
          }
        })
        .do((user: User) => this.user = user);
  }

  logado() {
    return this.user;
  }

  deslogar() {
    this.user = {
      name: '',
      email: '',
      level: 0
    };
  }
}
