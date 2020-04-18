import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder:FormBuilder, private authService:AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  submit(event){
    event.preventDefault();
    console.log(this.loginForm.value);
    // this.authService.login(this.loginForm.get('login').value, this.loginForm.get('password').value);
  }

}
