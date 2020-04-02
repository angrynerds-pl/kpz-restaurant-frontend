import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-personnel-database',
  templateUrl: './personnel-database.component.html',
  styleUrls: ['./personnel-database.component.scss'],
 
})
export class PersonnelDatabaseComponent implements OnInit {

 
 
 
 users:User[];
 
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      
    });
  }
}
