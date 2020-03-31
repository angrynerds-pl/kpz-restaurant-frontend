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
      new User(0, "adamn", "qwerty", "Adam", "Nowak", "Waiter"),
      new User(1, "kubag", "123", "Kuba", "Grabowski", "Cook")
    ];
  }

  addUser(user){
    this.users.push(user);
  }

  getCategories():Observable<User[]>{
    return ObservableOf(this.users);
  }

  getLastCategoryID(){
    return this.users.length;
    
  }
}
