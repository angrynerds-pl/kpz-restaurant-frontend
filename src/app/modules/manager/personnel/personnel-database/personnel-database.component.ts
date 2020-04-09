import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import{ PersonnelDatabaseDialogComponent} from '../personnel-database-dialog/personnel-database-dialog.component';

@Component({
  selector: 'app-personnel-database',
  templateUrl: './personnel-database.component.html',
  styleUrls: ['./personnel-database.component.scss'],
 
})
export class PersonnelDatabaseComponent implements OnInit {

 
 
 user:User;
 users:User[];
 
  constructor(private userService:UserService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      
    });
  }
  openDialog(user:User): void {
    const dialogConfig = new MatDialogConfig();


dialogConfig.autoFocus = true;
dialogConfig.data = {
user: user

};

const dialogRef = this.dialog.open(PersonnelDatabaseDialogComponent, dialogConfig);

dialogRef.afterClosed().subscribe(result => {
this.userService.getUsers().subscribe((users)=>{
  this.users=users;
  console.log(this.users);
});

});
  }

}