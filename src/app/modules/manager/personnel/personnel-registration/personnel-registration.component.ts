import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: 'app-personnel-registration',
  templateUrl: './personnel-registration.component.html',
  styleUrls: ['./personnel-registration.component.scss']
})
export class PersonnelRegistrationComponent implements OnInit {

  acceptIcon = faCheck;
  cancelIcon = faTimes;

  newUser: User;

  private userID:number;

  public userForm:FormGroup;

  constructor(private userService:UserService, private toastrService:ToastrService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.updateForm();
  }

  updateForm(){
    this.userForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName:[null, Validators.required],
      username:[null, Validators.required],
      password:[null, Validators.required],
      position:[null, Validators.required],
    });
  }

  resetForm(){
    this.userForm.reset();
  }

  createAccount(){
    if (this.userForm.valid) {
      this.userID = this.userService.getLastUserID();
      this.newUser = Object.assign({}, this.userForm.value);
      this.newUser.id = this.userID;

      this.userService.addUser(this.newUser);

      this.resetForm();
      this.toastrService.success("New user added!");
    }
  }
}
