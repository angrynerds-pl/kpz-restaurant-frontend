import { Injectable, ComponentFactoryResolver } from '@angular/core';
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

  getReservations(): Observable<Array<Reservation>> {
    return this.http.get<Array<Reservation>>(this.host + "api/reservations", {
      headers: new HttpHeaders().set(
        "Authorization",
        "Bearer " + this.storageService.getToken()
      ),
    });
  }

  getReservationsByDatetime(datetime:Date): Observable<Array<Reservation>> {
    
    let years = datetime.getFullYear();
    let months = datetime.getMonth()+1;
    let days = datetime.getDate();
    let hours = datetime.getHours();
    let minutes = datetime.getMinutes();
    
    
  return this.http.get<Array<Reservation>>(this.host + "api/reservations/"+years+"/"+months+"/"+days+"/"+hours+"/"+minutes, {
      headers: new HttpHeaders().set(
        "Authorization",
        "Bearer " + this.storageService.getToken()
      ),
    });
  }
  
  addReservation(
    reservation:Reservation
  ) {
      reservation.startDate.setHours(reservation.startDate.getHours() + 2);
      reservation.endDate.setHours(reservation.endDate.getHours() + 2);
        return this.http.post<Reservation>(
      this.host + "api/reservations",{
      numberOfSeats:reservation.numberOfSeats,
      customerName:reservation.customerName,
      tableId:reservation.tableId,
      startDate: reservation.startDate,
      endDate: reservation.endDate,
      note:reservation.note
      }
     ,
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
    console.log("cscscsc");
    return this.http.put<Reservation>(
      this.host + "api/reservations",{
        id: reservation.id,
        numberOfSeats:reservation.numberOfSeats,
        customerName:reservation.customerName,
        tableId:reservation.tableId,
        startDate: reservation.startDate,
        endDate: reservation.endDate,
        note:reservation.note
        }
       ,
      {
        headers: new HttpHeaders().set(
          "Authorization",
          "Bearer " + this.storageService.getToken()
        ),
      }
    );
  }

}
