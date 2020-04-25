import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loginSubscription: Subscription;

  constructor(private formBuilder:FormBuilder, private authService:AuthService, 
    private localStorageService:LocalStorageService, private toastrService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      Username: [null, Validators.required],
      Password: [null, Validators.required]
    })
  }

  submit(event){
    event.preventDefault();
    this.loginSubscription = this.authService.login(this.loginForm.get('Username').value, this.loginForm.get('Password').value)
    .subscribe(data => {
      this.localStorageService.setToken(data.token);
      this.localStorageService.setRole(data.token);
      this.toastrService.success('Welcome!');
      this.navigate(this.localStorageService.getRole());
    }, error => {
      this.toastrService.error('Error!', 'Invalid login or password');
    })
  }

  ngOnDestroy(){
    if(this.loginSubscription) this.loginSubscription.unsubscribe();
  }

  navigate(role: string) {
    switch(role){
      case 'MANAGER':
        return this.router.navigate(['/manager']);
      case 'COOK':
        return this.router.navigate(['/cook']);
      default:
        return this.router.navigate(['/waiter']);
    }
  }

}
