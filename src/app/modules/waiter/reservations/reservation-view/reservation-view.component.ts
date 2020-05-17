import { Component, OnInit, Input } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { Reservation } from 'src/app/models/reservation';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddNewReservationComponent } from '../add-new-reservation/add-new-reservation.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-reservation-view',
  templateUrl: './reservation-view.component.html',
  styleUrls: ['./reservation-view.component.scss']
})
export class ReservationViewComponent implements OnInit {

  deleteReservationIcon=faTrashAlt;

  @Input() reservationDetails:Reservation;
  todayDate:Date= new Date();
  reservationDate :Date;
  role:string;

  constructor(private _bottomSheet:MatBottomSheet, private storageService:LocalStorageService, private reservationsService:ReservationService) { }

  ngOnInit(): void {
    this.reservationDate = new Date(this.reservationDetails.startDate);
    this.todayDate.setHours(0);

    this.role = this.storageService.getRole();
  }

  deleteReservation(reservationDetails){
    this.reservationsService.deleteReservation(reservationDetails.id).subscribe();
  }
  updateReservation(reservationDetails){
    
    //if(this.role=="HEAD_WAITER"){

    this._bottomSheet._openedBottomSheetRef = this._bottomSheet.open(
      AddNewReservationComponent,
      {
        data: { reservationDetails:reservationDetails
          },
        disableClose: false,
      }
    );
  //}
  }

}
