import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from "src/environments/environment";
import {  HttpHeaders } from "@angular/common/http";
import { LocalStorageService } from "./local-storage.service";
@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  
  host: string = environment.host;
  

  constructor(private http:HttpClient, private storageService:LocalStorageService) { }

  // we will filter by date I guess
  
  getReservations(): Observable<Array<Reservation>> {
    return this.http.get<Array<Reservation>>(this.host + "api/reservations", {
      headers: new HttpHeaders().set(
        "Authorization",
        "Bearer " + this.storageService.getToken()
      ),
    });
  }

  getReservationsByDatetime(datetime:Date): Observable<Array<Reservation>> {
    return this.http.get<Array<Reservation>>(this.host + "api/reservations", {
      headers: new HttpHeaders().set(
        "Authorization",
        "Bearer " + this.storageService.getToken()
      ),
    });
  }
  
  addReservation(
    reservation:Reservation
  ) {
    
    return this.http.post<Reservation>(
      this.host + "api/reservations",
     reservation,
      {
        headers: new HttpHeaders().set(
          "Authorization",
          "Bearer " + this.storageService.getToken()
        ),
      }
    );
  }
 
  deleteReservation(id:number){
    return this.http.delete<Reservation>(
      this.host + "api/reservations/"+id,
      {
        headers: new HttpHeaders().set(
          "Authorization",
          "Bearer " + this.storageService.getToken()
        ),
      }
    );
  }
  updateReservation(reservation:Reservation){
    return this.http.put<Reservation>(
      this.host + "api/reservations",reservation,
      {
        headers: new HttpHeaders().set(
          "Authorization",
          "Bearer " + this.storageService.getToken()
        ),
      }
    );
  }

}
