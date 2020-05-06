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

  constructor(private http:HttpClient, private storageSerice:LocalStorageService) { }

  getRooms(): Observable<Array<Room>>{
    return this.http.get<Array<Room>>(this.host + 'api/rooms', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storageSerice.getToken()),
  });
  }

}
