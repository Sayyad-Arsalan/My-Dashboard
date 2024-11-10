import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class SessionDataService {

  constructor(private sessionStore: SessionStorageService) { }
  setUserInfo(userInfo: any) {
    this.sessionStore.store('userInfo', userInfo);
  }

  getUserInfo() {
    return this.sessionStore.retrieve('userInfo');
  }

  clearUserInfo() {
    this.sessionStore.clear('userInfo');
  }
  setToken(token: any) {
    this.sessionStore.store('token', token);
  }

  getToken() {
    return this.sessionStore.retrieve('token');
  }

  clearToken() {
    this.sessionStore.clear('token');
  }
}
