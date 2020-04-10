import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { WaiterRoutingModule } from './waiter-routing.module';
import { WaiterMainComponent } from './waiter-main/waiter-main.component';
import { TablesMainComponent } from './tables/tables-main/tables-main.component';
import { TableComponent } from './table-service/table/table.component';
import { TableViewComponent } from './tables/table-view/table-view.component';
import { EmptyViewComponent } from './tables/empty-view/empty-view.component';
import { ReservationsMainComponent } from './reservations/reservations-main/reservations-main.component';
import { ReservationViewComponent } from './reservations/reservation-view/reservation-view.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    WaiterMainComponent, 
    TablesMainComponent, 
    TableComponent, 
    TableViewComponent, 
    EmptyViewComponent, 
    ReservationsMainComponent,
    ReservationViewComponent
  ],
  imports: [
    CommonModule,
    WaiterRoutingModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class WaiterModule { }
