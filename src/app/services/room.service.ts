import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Room } from '../models/room';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  host = environment.host;

  constructor(private http:HttpClient, private storageService:LocalStorageService) { }

  getRooms(): Observable<Array<Room>>{
    return this.http.get<Array<Room>>(this.host + 'api/rooms', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storageService.getToken()),
    });
  }

  addRoom(room: Room):Observable<Room> {
    return this.http.post<Room>(this.host + 'api/rooms', room, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storageService.getToken()),
    });
  }

  deleteRoom(room: Room): Observable<Room> {
    return this.http.delete<any>(this.host + 'api/rooms/' + room.id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storageService.getToken()),
    });
  }

}
