import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { Observable } from "rxjs";
import { of as ObservableOf } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class UserService {
  users: User[];
 
  constructor() {
    this.users = [
    {id:0,username: "adamn",password: "qwerty",firstName: "Adam",lastName: "Nowak",position: "Waiter"},
    {id:1,username: "kubag",password: "123", firstName:"Kuba",lastName: "Grabowski",position: "Cook"}
    ];
  }

  addUser(user){
    this.users.push(user);
  }

  getUsers():Observable<User[]>{
    return ObservableOf(this.users);
  }

  getLastUserID(){
    return this.users.length;
    
  }
}
