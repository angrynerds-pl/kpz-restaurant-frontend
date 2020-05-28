import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Table } from 'src/app/models/table';
import { Reservation } from 'src/app/models/reservation';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddNewReservationComponent } from '../../reservations/add-new-reservation/add-new-reservation.component';
import { ReservationService } from 'src/app/services/reservation.service';
import { interval, Subscription, timer } from 'rxjs';

import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {

  @Input() table:Table;
  @Input() tablesNotifications:number[];
  
  @Input() newReservation:Reservation;
  @Input() reservationDate:Date;
  @Input() avaivableReservations:Reservation[];

  tableIsFree:boolean=true;
  
  turnOnNotificationsBoolean=true;
  
  
  
  constructor( private _bottomSheet:MatBottomSheet) { }
  
  
  

  ngOnInit(): void {
    
    
  }
  
  getClass() {
    switch(this.table.status){
      case 'FREE':
        return 'table-view free';
      case 'SERVE':
        return 'table-view serve';
      case 'OCCUPIED':
        return 'table-view occupied';
    }
  }

  getReservationStatus(){
    
    if(this.avaivableReservations.some((reservation)=> reservation.tableId==this.table.id)){
      this.tableIsFree=false;
      return 'table-view booked';
    }else{
      this.tableIsFree=true;
      return 'table-view available';
    }
    
    
  }

  addNewReservation(){
    if(this.tableIsFree){
      
    this.newReservation.startDate = this.reservationDate;
   
    this._bottomSheet._openedBottomSheetRef = this._bottomSheet.open(
      AddNewReservationComponent,
      {
        data: { reservationDetails:this.newReservation,
                table:this.table
          },
        disableClose: false,
      });
    }
  }


  checkOfReadyProducts(id){
    if(this.tablesNotifications.find(n => n==id)){
      return true;
    }else{
      return false;
    }
    
  }
}
