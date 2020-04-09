import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Room } from '../models/room';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  rooms: Array<Room> = [
    { roomID: 1, number: 1, rows: 5, columns: 4 },
    { roomID: 2, number: 2, rows: 5, columns: 3 }
  ]

  constructor(private http:HttpClient) { }

  getRooms(): Observable<Array<Room>>{
    return of(this.rooms);
    // return this.http.get<Array<Room>>(url);
  }

}
