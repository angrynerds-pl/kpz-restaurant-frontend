import { Injectable } from '@angular/core';
import * as jwt_decode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  constructor() { }

  setToken(token: string){
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getRole(){
    return this.getDecodedAccessToken(this.getToken()).role;
  }

  getRestaurantId(){
    return this.getDecodedAccessToken(this.getToken()).Restaurant;
  }

  isLoggedIn(){
    if(localStorage.getItem('token')) return true;
    return false;
  }

  logout(){
    localStorage.removeItem('token');
  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

}
