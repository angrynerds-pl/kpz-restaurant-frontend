import { Injectable } from '@angular/core';
import { Table } from '../models/table';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  tables: Array<Table> = [
    { tableID: 1, number: 1, seats: 2, status: 'free', roomID: 1, x: 1, y: 0 },
    { tableID: 2, number: 2, seats: 4, status: 'free', roomID: 1, x: 0, y: 1 },
    { tableID: 3, number: 3, seats: 2, status: 'free', roomID: 1, x: 0, y: 2 },
    { tableID: 4, number: 4, seats: 3, status: 'free', roomID: 1, x: 1, y: 3 },
    { tableID: 5, number: 5, seats: 2, status: 'free', roomID: 1, x: 3, y: 0 },
    { tableID: 6, number: 6, seats: 4, status: 'free', roomID: 1, x: 2, y: 1 },
    { tableID: 7, number: 7, seats: 3, status: 'free', roomID: 1, x: 2, y: 2 },
    { tableID: 8, number: 8, seats: 3, status: 'free', roomID: 1, x: 3, y: 3 },
    { tableID: 9, number: 9, seats: 3, status: 'free', roomID: 1, x: 4, y: 1 },
    { tableID: 10, number: 10, seats: 4, status: 'free', roomID: 1, x: 4, y: 2 },
    { tableID: 11, number: 11, seats: 2, status: 'free', roomID: 2, x: 0, y: 0 },
    { tableID: 12, number: 12, seats: 2, status: 'free', roomID: 2, x: 2, y: 0 },
    { tableID: 13, number: 13, seats: 2, status: 'free', roomID: 2, x: 4, y: 0 },
    { tableID: 14, number: 14, seats: 2, status: 'free', roomID: 2, x: 0, y: 2 },
    { tableID: 15, number: 15, seats: 2, status: 'free', roomID: 2, x: 2, y: 2 },
    { tableID: 16, number: 16, seats: 3, status: 'free', roomID: 2, x: 4, y: 2 }
  ]

  constructor() { }

  getTables(roomID: number): Observable<Array<Table>>{
    return of(this.tables.filter(e => e.roomID === roomID));
    // return this.http.get<Array<Table>>(url);
  }

  getTable(tableID: number): Observable<Table> {
    return of(this.tables.find(e => e.tableID == tableID));
    // return this.http.get<Table>(url);
  }

}
