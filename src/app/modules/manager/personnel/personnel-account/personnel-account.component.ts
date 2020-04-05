import { Component, OnInit,Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { faCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-personnel-account',
  templateUrl: './personnel-account.component.html',
  styleUrls: ['./personnel-account.component.scss']
})
export class PersonnelAccountComponent implements OnInit {

  @Input() userToEdit:User;

  userForm:FormGroup;
  acceptIcon = faCheck;
  cancelIcon = faTimes;
  editing:boolean;
  user: User;

  private userID:number;

  //public userForm:FormGroup;
  constructor(private userService:UserService, private toastrService:ToastrService, private fb:FormBuilder) {
   
   
   }

  ngOnInit(): void {
    if(this.userToEdit.firstName==null){
      this.editing=false;
    }
      else{
       this.editing=true;
      }
  this.updateForm();
  
  }

  updateForm(){
    this.userForm = this.fb.group({
      firstName: [this.userToEdit.firstName, Validators.required],
      lastName:[this.userToEdit.lastName, Validators.required],
      username:[this.userToEdit.username, Validators.required],
      password:[this.userToEdit.password, Validators.required],
      position:[this.userToEdit.position, Validators.required],
    });
  }
  resetForm(){
    if(!this.editing){
    this.userForm.reset();
    }
  }

  setAccount(){
    if(!this.editing){
      if (this.userForm.valid) {
        this.userID = this.userService.getLastUserID();
        this.user = Object.assign({}, this.userForm.value);
        this.user.id = this.userID;
  
        this.userService.addUser(this.user);
  
        this.resetForm();
        this.toastrService.success("New user added!");
      }
    }else{
      if (this.userForm.valid) {
        
        this.user = Object.assign({}, this.userForm.value);
        this.user.id = this.userToEdit.id;
        this.userService.updateUser(this.user);
        
        this.toastrService.success("User edited!");
      }
    }
    
  }
}
