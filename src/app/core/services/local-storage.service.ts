import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  LOCALSTORAGE_TOKEN_KEY: string = 'AuthToken'; 
  LOCALSTORAGE_USER_DETAIL_KEY: string = 'UserDetails';
  LOCALSTORAGE_USER_CREDENTIALS_KEY: string = 'UserCredentials';

  constructor() { }

  storeAuthToken(token) {
    localStorage.setItem(this.LOCALSTORAGE_TOKEN_KEY, token);
  }

  removeAuthToken() { 
    localStorage.removeItem(this.LOCALSTORAGE_TOKEN_KEY);
  }
  
  getAuthorizationToken() {
    return localStorage.getItem(this.LOCALSTORAGE_TOKEN_KEY);
  }

  isAuthenticated(): boolean { 
    const token = localStorage.getItem(this.LOCALSTORAGE_TOKEN_KEY);
    if (token && token != '') {
      return true;
    }
    return false;
  }

  storeUserDetail(data) {
    localStorage.setItem(this.LOCALSTORAGE_USER_DETAIL_KEY, JSON.stringify(data));
  }

  getUserDetail() {
    let userDetailData = localStorage.getItem(this.LOCALSTORAGE_USER_DETAIL_KEY);

    if (userDetailData)
      return JSON.parse(userDetailData);

    return { UserName: "", password: "" };
  }
  storeUserCredentials(data) {
    localStorage.setItem(this.LOCALSTORAGE_USER_CREDENTIALS_KEY, JSON.stringify(data));
  }
  getUserCredentials() {
    let UserCredentials = localStorage.getItem(this.LOCALSTORAGE_USER_CREDENTIALS_KEY);

    if (UserCredentials)
      return JSON.parse(UserCredentials);

    return { UserName: "", password: "" };
  }

  logout() {
    localStorage.removeItem(this.LOCALSTORAGE_TOKEN_KEY);
    localStorage.removeItem(this.LOCALSTORAGE_USER_DETAIL_KEY);
  }

}
