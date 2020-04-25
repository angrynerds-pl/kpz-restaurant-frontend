import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CookMainComponent } from './cook-main/cook-main.component';
import { CookGuard } from 'src/app/guards/cook.guard';

const routes: Routes = [{path: '', canActivate: [CookGuard], component: CookMainComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CookRoutingModule { }
