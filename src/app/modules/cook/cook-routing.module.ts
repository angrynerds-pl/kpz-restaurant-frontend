import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CookMainComponent } from './cook-main/cook-main.component';
import { OrderPanelComponent } from './order-panel/order-panel.component';

const routes: Routes = [
  {path: '', component: CookMainComponent},
  {path: 'order-panel', component: OrderPanelComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CookRoutingModule { }
