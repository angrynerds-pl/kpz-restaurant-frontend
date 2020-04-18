import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeMainComponent } from './home-main/home-main.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeMainComponent,
    children: [
      { 
        path: '', 
        redirectTo: 'login',
        pathMatch: 'full'
      },
      { 
        path: 'login', 
        component: LoginComponent
      },
      { 
        path: 'register', 
        component: RegisterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
