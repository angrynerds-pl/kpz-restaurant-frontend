import { Component, OnInit, OnDestroy } from '@angular/core';
import { faBars, faTintSlash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {AddNewReservationComponent} from '../add-new-reservation/add-new-reservation.component'
import { Reservation } from 'src/app/models/reservation';
import { Subscription } from 'rxjs';
import { ReservationService } from 'src/app/services/reservation.service';
@Component({
  selector: 'app-reservations',
  templateUrl: './reservations-main.component.html',
  styleUrls: ['./reservations-main.component.scss']
})
export class ReservationsMainComponent implements OnInit, OnDestroy {

  menuIcon = faBars;
  plusIcon = faPlus;
  reservations:Array<Reservation>;

  reservationsSubscription:Subscription;

  constructor(private _bottomSheet:MatBottomSheet, private reservationService:ReservationService) { }
  

  ngOnInit(): void {
    this.reservations = new Array();
    this.reservationsSubscription = this.reservationService.getReservations().subscribe((reservations)=>{
      this.reservations = reservations;
    });
  }

  ngOnDestroy(): void {
    this.reservationsSubscription.unsubscribe();
  }












  addNewReservation(){
    this._bottomSheet._openedBottomSheetRef = this._bottomSheet.open(
      AddNewReservationComponent,
      {
        data: { },
        disableClose: false,
      }
    );
  }
}
