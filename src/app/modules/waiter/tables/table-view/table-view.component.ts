import { Component, OnInit, Input } from '@angular/core';
import { Table } from 'src/app/models/table';
import { Reservation } from 'src/app/models/reservation';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddNewReservationComponent } from '../../reservations/add-new-reservation/add-new-reservation.component';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {

  @Input() table:Table;
  @Input() newReservation:Reservation;
  @Input() reservations:Reservation[];
  @Input() reservationDate:Date;
  @Input() avaivableReservations:Reservation[];

  tableIsFree:boolean=true;

  constructor(private reservationService:ReservationService, private _bottomSheet:MatBottomSheet) { }

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
     /* this._bottomSheet._openedBottomSheetRef
      .afterDismissed()
      .subscribe((data) => {
        console.log("this.reservations 1",this.reservations);
        this.reservationService.getReservations().subscribe((reservations)=>{
          this.reservations = reservations;
          console.log("this.reservations 2",this.reservations);
        });
        
      });*/
  }
}
