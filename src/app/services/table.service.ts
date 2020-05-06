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

  constructor(private http:HttpClient, private storageSerice:LocalStorageService) {}

  getTables(roomID: number): Observable<Array<Table>> {
    return this.http.get<Array<Table>>(this.host + 'api/tables/room/' + roomID, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storageSerice.getToken()),
    });
  }

  getTable(tableID: number): Observable<Table> {
    return this.http.get<Table>(this.host + 'api/tables/' + tableID, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storageSerice.getToken()),
    });
  }

  updateTable(table: Table){
    return this.http.put<Table>(this.host + 'api/tables/' + table.id, table, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storageSerice.getToken()),
    });
  }

  changeStatusOfTable(tableID: number) {
    this.getTable(tableID).pipe(take(1)).subscribe(table => {
      if(table){
        switch (table.status) {
          case "free":
            table.status = 'serve';
            break;
          case "serve":
            table.status = 'occupied';
            break;
          case "occupied":
            table.status = 'free';
            break;
        }
        this.updateTable(table).pipe(take(1)).subscribe(data => {
          console.log(data);
        })
      }
    })
  }
}
