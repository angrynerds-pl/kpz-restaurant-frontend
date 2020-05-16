import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
@Injectable({
  providedIn: "root"
})
export class UserService {
  
  host = environment.host;
  
  users: User[];
 
  constructor(private http:HttpClient, private storageService:LocalStorageService) {
    this.users = [
      {id:0,username: "adamn",password: "qwerty",firstName: "Adam",lastName: "Nowak",position: "Waiter", restaurantId:1, rights: 1},
      {id:1,username: "kubag",password: "123", firstName:"Kuba",lastName: "Grabowski",position: "Cook", restaurantId:1, rights: 1}
    ];
  }

  getUsers():Observable<Array<User>>{
    return this.http.get<Array<User>>(this.host + 'api/users', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storageService.getToken()),
    });
  }

  getUser(id: number):Observable<User>{
    return this.http.get<User>(this.host + 'api/users/' + id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storageService.getToken()),
    });
  }

  updateUser(user: User):Observable<User>{
    return this.http.put<User>(this.host + 'api/users/' + user.id, user, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storageService.getToken()),
    });
  }

  deleteUser(user: User):Observable<User>{
    return this.http.delete<User>(this.host + 'api/users/' + user.id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storageService.getToken()),
    });
  }

  getWaiters():Observable<Array<User>>{
    return this.http.get<Array<User>>(this.host + 'api/users/waiters', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storageService.getToken()),
    });
  }

  getCooks():Observable<Array<User>>{
    return this.http.get<Array<User>>(this.host + 'api/users/cooks', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storageService.getToken()),
    });
  }

  addWaiter(user: User):Observable<User>{
    return this.http.post<User>(this.host + 'api/users/waiters', user, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storageService.getToken()),
    });
  }

  addCook(user: User):Observable<User>{
    return this.http.post<User>(this.host + 'api/users/cooks', user, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storageService.getToken()),
    });
  }

  addUser(user){
    this.users.push(user);
  }

  findUser(id){
    console.log("index user",id )
    let index = this.users.findIndex(user => user.id ===id);
    return index;
  }

  getLastUserID(){
    if(this.users.length!=0){
      return this.users[this.users.length-1].id+1;
    } else {
      return 0;
    }
  }

}
