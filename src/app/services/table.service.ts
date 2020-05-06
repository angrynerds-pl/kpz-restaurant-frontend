import { Injectable } from "@angular/core";
import { Table } from "../models/table";
import { Observable, of } from "rxjs";
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class TableService {

  host = environment.host;

  constructor(private http:HttpClient, private storageService:LocalStorageService) {}

  getTables(roomID: number): Observable<Array<Table>> {
    return this.http.get<Array<Table>>(this.host + 'api/tables/room/' + roomID, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storageService.getToken()),
    });
  }

  getTable(tableID: number): Observable<Table> {
    return this.http.get<Table>(this.host + 'api/tables/' + tableID, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storageService.getToken()),
    });
  }

  addTable(table: Table){
    return this.http.post<Table>(this.host + 'api/tables/', table, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storageService.getToken()),
    });
  }

  updateTable(table: Table){
    return this.http.put<Table>(this.host + 'api/tables/' + table.id, table, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storageService.getToken()),
    });
  }

  deleteTable(table: Table){
    return this.http.delete<any>(this.host + 'api/tables/' + table.id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storageService.getToken()),
    });
  }

  changeStatusOfTable(tableID: number) {
    this.getTable(tableID).pipe(take(1)).subscribe(table => {
      if(table){
        switch (table.status) {
          case 'FREE':
            table.status = 'SERVE';
            break;
          case 'SERVE':
            table.status = 'OCCUPIED';
            break;
          case "OCCUPIED":
            table.status = 'FREE';
            break;
        }
        this.updateTable(table).pipe(take(1)).subscribe(data => {
          console.log(data);
        })
      }
    })
  }
}
