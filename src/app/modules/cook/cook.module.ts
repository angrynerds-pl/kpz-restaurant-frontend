import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CookRoutingModule } from './cook-routing.module';
import { CookMainComponent } from './cook-main/cook-main.component';
import { OrderPanelComponent } from './order-panel/order-panel.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { OrderItemProductComponent } from './order-item-product/order-item-product.component';


@NgModule({
  declarations: [CookMainComponent, OrderPanelComponent, OrderItemComponent, OrderItemProductComponent],
  imports: [
    CommonModule,
    CookRoutingModule
  ],
  exports: [
    CookMainComponent
  ]
})
export class CookModule { }
