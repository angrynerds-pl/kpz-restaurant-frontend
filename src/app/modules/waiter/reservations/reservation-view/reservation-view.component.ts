import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { Reservation } from 'src/app/models/reservation';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddNewReservationComponent } from '../add-new-reservation/add-new-reservation.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { faTimes } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-reservation-view',
  templateUrl: './reservation-view.component.html',
  styleUrls: ['./reservation-view.component.scss']
})
export class ReservationViewComponent implements OnInit {

  deleteReservationIcon=faTimes;

  @Input() reservationDetails:Reservation;
  @Output() updateEmitter:EventEmitter<any> = new EventEmitter();
  todayDate:Date= new Date();
  reservationDate :Date;
  role:string;
  deletingReservation:boolean=false;
  constructor(private _bottomSheet:MatBottomSheet, private storageService:LocalStorageService, private reservationsService:ReservationService) { }

  ngOnInit(): void {
    this.reservationDate = new Date(this.reservationDetails.startDate);
    this.todayDate.setHours(0);

    this.role = this.storageService.getRole();
  }

  deleteReservation(reservationDetails){
    this.deletingReservation = true;
    
    this.reservationsService.deleteReservation(reservationDetails.id).subscribe(r=>{
      this.updateEmitter.emit();
    });
    
  }
  updateReservation(reservationDetails){
    if(!this.deletingReservation){
    //if(this.role=="HEAD_WAITER"){

    this._bottomSheet._openedBottomSheetRef = this._bottomSheet.open(
      AddNewReservationComponent,
      {
        data: { reservationDetails:reservationDetails,
                table:null
          },
        disableClose: false,
      }
    );
    
  //}
    }
    this.deletingReservation = false;
  }

}
