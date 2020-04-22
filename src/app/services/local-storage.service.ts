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

  setRole(token: string){
    localStorage.setItem('role', this.getDecodedAccessToken(token).role);
  }

  getRole(){
    return localStorage.getItem('role');
  }

  isLoggedIn(){
    if(localStorage.getItem('token')) return true;
    return false;
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('role');
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
