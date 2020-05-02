import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  reservations: Array<Reservation> = [
    { 
      reservationID: 1, 
      tableID: 5, 
      numberOfSeats: 3, 
      customerName: 'John Adams', 
      startDate: '2020-04-07 14:45', 
      endDate: '2020-04-07 15:45' 
    },
    { 
      reservationID: 2, 
      tableID: 5, 
      numberOfSeats: 2, 
      customerName: 'Thomas Smith', 
      startDate: '2020-04-07 12:45', 
      endDate: '2020-04-07 13:15' 
    },
    { 
      reservationID: 3, 
      tableID: 4, 
      numberOfSeats: 3, 
      customerName: 'Thomas Edison', 
      startDate: '2020-05-02 13:54', 
      endDate: '2020-05-02 13:55' 
    }
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
