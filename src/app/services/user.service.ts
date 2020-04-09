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
  updateUser(user){
   let userArrayIndex = this.findUser(user.id);
    this.users[userArrayIndex] = user;
  }
  removeUser(user){
    let userArrayIndex = this.findUser(user.id);
     console.log("index",userArrayIndex )
    this.users.splice(userArrayIndex,1);
  }
  findUser(id){
    console.log("index user",id )
   let index = this.users.findIndex(user => user.id ===id);
    
      
      return index;
  }
  getLastUserID(){
    if(this.users.length!=0){
      return this.users[this.users.length-1].id+1;
    }else{
        return 0;
    }
    
    
  }
}
