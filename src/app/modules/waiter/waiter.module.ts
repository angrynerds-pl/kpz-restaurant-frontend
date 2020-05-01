import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { WaiterRoutingModule } from './waiter-routing.module';
import { WaiterMainComponent } from './waiter-main/waiter-main.component';
import { TablesMainComponent } from './tables/tables-main/tables-main.component';
import { TableComponent } from './table-service/table/table.component';
import { TableViewComponent } from './tables/table-view/table-view.component';
import { EmptyViewComponent } from './tables/empty-view/empty-view.component';
import { ReservationsMainComponent } from './reservations/reservations-main/reservations-main.component';
import { ReservationViewComponent } from './reservations/reservation-view/reservation-view.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TableAddOrderComponent } from './table-service/table-add-order/table-add-order.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { OrderSummaryComponent } from './table-service/order-summary/order-summary.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { BillComponent } from './table-service/bill/bill.component';
import {MatSelectModule} from '@angular/material/select';
import { AddNewReservationComponent } from './reservations/add-new-reservation/add-new-reservation.component';


@NgModule({
  declarations: [
    WaiterMainComponent, 
    TablesMainComponent, 
    TableComponent, 
    TableViewComponent, 
    EmptyViewComponent, 
    ReservationsMainComponent,
    ReservationViewComponent,
    TableAddOrderComponent,
    OrderSummaryComponent,
    BillComponent,
    AddNewReservationComponent,
    
  ],
  imports: [
    CommonModule,
    WaiterRoutingModule,
    FormsModule,
    FontAwesomeModule,
    MatBottomSheetModule,
    NgxPaginationModule,
    MatSelectModule,
    ReactiveFormsModule
  ]
})
export class WaiterModule { }
