import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeMainComponent } from './home-main/home-main.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: HomeMainComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
