import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  reservations: Array<Reservation> = [
    
  ]

  constructor(private http:HttpClient) { }

  // we will filter by date I guess
  getReservations():Observable<Array<Reservation>> {
    return of(this.reservations);
    // return this.http.get<Array<Reservation>>(url);
  }

  addReservation(reservation){
    this.reservations.push(reservation);
  }

  getLastReservationID(){
    return this.reservations.length;
    
  }

}
