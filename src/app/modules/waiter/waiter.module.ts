import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { WaiterRoutingModule } from './waiter-routing.module';
import { WaiterMainComponent } from './waiter-main/waiter-main.component';
import { TablesComponent } from './tables/tables.component';
import { TableViewComponent } from './table-view/table-view.component';
import { EmptyViewComponent } from './empty-view/empty-view.component';


@NgModule({
  declarations: [
    WaiterMainComponent, 
    TablesComponent, 
    TableViewComponent, 
    EmptyViewComponent
  ],
  imports: [
    CommonModule,
    WaiterRoutingModule,
    FormsModule
  ]
})
export class WaiterModule { }
