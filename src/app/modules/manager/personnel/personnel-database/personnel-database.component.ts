import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { PersonnelDatabaseDialogComponent } from '../personnel-database-dialog/personnel-database-dialog.component';
import { Subscription } from 'rxjs';
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-personnel-database',
  templateUrl: './personnel-database.component.html',
  styleUrls: ['./personnel-database.component.scss'],
 
})
export class PersonnelDatabaseComponent implements OnInit, OnDestroy {

  user:User;
  users:User[];
  edit = faUserEdit;

  userSubscription: Subscription;
 
  constructor(private userService:UserService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userSubscription = this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.setUsersPostion();
    });
  }

  openDialog(user:User): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      user: user
    };

    const dialogRef = this.dialog.open(PersonnelDatabaseDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => { this.loadUsers() });
    
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  setUsersPostion(){
    this.users.forEach(user => {
      user.position = this.getPositionName(user.rights)
    })
  }

  getPositionName(rights: number){
    switch(rights) {
      case 0:
        return 'manager';
      case 1:
        return 'cook';
      case 2:
        return 'waiter';
      default:
        return 'head waiter';
    }
  }

}