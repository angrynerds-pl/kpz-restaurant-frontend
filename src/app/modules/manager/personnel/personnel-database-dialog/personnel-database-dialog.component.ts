import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-personnel-database-dialog',
  templateUrl: './personnel-database-dialog.component.html',
  styleUrls: ['./personnel-database-dialog.component.scss']
})
export class PersonnelDatabaseDialogComponent implements OnInit {


  modalTitle: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, private userService:UserService) {
      
     }

  ngOnInit(): void {
  }
  onNoClick(): void {
    
  }

  removeUser(){
    this.userService.removeUser(this.data.user);
  }
}
