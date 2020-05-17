import { Component, OnInit, Input } from '@angular/core';
import { Table } from 'src/app/models/table';
import { Reservation } from 'src/app/models/reservation';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddNewReservationComponent } from '../../reservations/add-new-reservation/add-new-reservation.component';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {

  @Input() table:Table;
  @Input() newReservation:Reservation;
  @Input() reservationDate:Date;
  constructor(private _bottomSheet:MatBottomSheet) { }

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
  addNewReservation(){
    this.newReservation.startDate = this.reservationDate;
   
    this._bottomSheet._openedBottomSheetRef = this._bottomSheet.open(
      AddNewReservationComponent,
      {
        data: { reservationDetails:this.newReservation,
                tableDetails:this.table
          },
        disableClose: false,
      }
    );
  }
}
