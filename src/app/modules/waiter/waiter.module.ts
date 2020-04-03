import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { WaiterRoutingModule } from './waiter-routing.module';
import { WaiterMainComponent } from './waiter-main/waiter-main.component';
import { TablesComponent } from './tables/tables.component';
import { TableComponent } from './table/table.component';
import { TableViewComponent } from './table-view/table-view.component';
import { EmptyViewComponent } from './empty-view/empty-view.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { ReservationViewComponent } from './reservation-view/reservation-view.component';

@NgModule({
  declarations: [
    WaiterMainComponent, 
    TablesComponent, 
    TableComponent, 
    TableViewComponent, 
    EmptyViewComponent, 
    ReservationsComponent,
    ReservationViewComponent
  ],
  imports: [
    CommonModule,
    WaiterRoutingModule,
    FormsModule
  ]
})
export class WaiterModule { }
