import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;

  loginSubscription: Subscription;

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  submit(event){
    event.preventDefault();
    console.log(this.loginForm.value);
    // this.loginSubscription = this.authService.login(this.loginForm.get('login').value, this.loginForm.get('password').value)
    // .subscribe(data => {
    //   this.localStorageService.setToken(data.token);
    // })
  }

  ngOnDestroy(){
    if(this.loginSubscription) this.loginSubscription.unsubscribe();
  }

}
