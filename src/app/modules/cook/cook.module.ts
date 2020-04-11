import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CookRoutingModule } from './cook-routing.module';
import { CookMainComponent } from './cook-main/cook-main.component';
import { OrderPanelComponent } from './order-panel/order-panel.component';


@NgModule({
  declarations: [CookMainComponent, OrderPanelComponent],
  imports: [
    CommonModule,
    CookRoutingModule
  ],
  exports: [
    CookMainComponent
  ]
})
export class CookModule { }
