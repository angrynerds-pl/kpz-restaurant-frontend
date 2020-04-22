import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../login/login.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  authSubscription: Subscription;

  constructor(private formBuilder:FormBuilder, private router:Router, 
    private authSerivce:AuthService, private toastrSerivce:ToastrService) { }

  ngOnInit(): void {

    const pattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,40}$';

    this.registerForm = this.formBuilder.group({
      Username: [null, Validators.required],
      Password: [null, [Validators.required, Validators.pattern(pattern)]],
      FirstName: [null, Validators.required],
      LastName: [null, Validators.required],
      RestaurantName: [null, Validators.required]
    })
  }

  submit(event){
    event.preventDefault();
    this.authSubscription = this.authSerivce.register(this.registerForm.value).subscribe(data => {
      this.toastrSerivce.success('Great!', 'Your account has been created!');
      this.router.navigate(['/login']);
    }, error => {
      this.toastrSerivce.error('Error!', 'Something went wrong :/');
    })
  }

  ngOnDestroy(){
    if(this.authSubscription) this.authSubscription.unsubscribe();
  }

}
