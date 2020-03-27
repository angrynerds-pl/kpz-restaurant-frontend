import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CookMainComponent } from './cook-main/cook-main.component';

const routes: Routes = [{path: '', component: CookMainComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CookRoutingModule { }
