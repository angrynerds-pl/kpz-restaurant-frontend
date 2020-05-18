import { Component, OnInit,Inject, OnDestroy } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-personnel-database-dialog',
  templateUrl: './personnel-database-dialog.component.html',
  styleUrls: ['./personnel-database-dialog.component.scss']
})
export class PersonnelDatabaseDialogComponent implements OnInit, OnDestroy {

  userSubscription: Subscription;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
    private userService:UserService, private toastrService:ToastrService) {}

  ngOnInit(): void {
  
  }
  
  removeUser(){
    this.userSubscription = this.userService.deleteUser(this.data.user).subscribe(data => {
      this.toastrService.success('Employee has been deleted');
    }, err => {
      this.toastrService.error('Error');
    });
  }

  ngOnDestroy() {
    if(this.userSubscription) this.userSubscription.unsubscribe();
  }

}
