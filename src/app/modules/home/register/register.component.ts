import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../login/login.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;

  constructor(private formBuilder:FormBuilder, private router:Router) { }

  ngOnInit(): void {

    const pattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,40}$';

    this.registerForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, [Validators.required, Validators.pattern(pattern)]],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      restaurant: [null, Validators.required]
    })
  }

  submit(event){
    event.preventDefault();
    console.log(this.registerForm.value);
    // request
    this.router.navigate(['/login']);
  }

  ngOnDestroy(){

  }

}
