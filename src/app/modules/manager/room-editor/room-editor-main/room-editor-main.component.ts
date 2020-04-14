import { Component, OnInit, OnDestroy } from '@angular/core';
import { Table } from 'src/app/models/table';
import { TableService } from 'src/app/services/table.service';
import { RoomService } from 'src/app/services/room.service';
import { Subscription } from 'rxjs';
import { Room } from 'src/app/models/room';

@Component({
  selector: 'app-room-editor-main',
  templateUrl: './room-editor-main.component.html',
  styleUrls: ['./room-editor-main.component.scss']
})
export class RoomEditorMainComponent implements OnInit, OnDestroy {

  rooms: Array<Room>; // list of current rooms

  rows:number; // number of rows selected by user from select
  columns: number; // number of columns selected by user from select

  rowsOption: Array<number>; // hardcoded number of rows (select options)
  columnsOption: Array<number>; // hardcoded number of columns (select options)

  grid: Array<Array<Table>>; // grid representation of tables
  tables: Array<Table> = []; // list of tables
  deletedTables: Array<Table> = [] // store of deleted tables (for server DELETE request)

  picked: boolean = false;

  tableSubscription: Subscription;
  roomSubscription: Subscription;

  constructor(private tableService:TableService, private roomService:RoomService) { }

  ngOnInit(): void {
    this.rowsOption = Array.from(Array(8).keys()).map(x => x + 3);
    this.columnsOption = Array.from(Array(3).keys()).map(x => x + 2);
    this.roomSubscription = this.roomService.getRooms().subscribe(data => {
      this.rooms = data;
    })
  }

  edit(room: Room){
    this.tableSubscription = this.tableService.getTables(room.roomID).subscribe(data => {
      this.tables = data;
      this.grid = new Array(room.rows).fill(null).map(() => new Array(room.columns).fill(null));
      for(let i = 0; i < room.rows; i++){
        for(let j = 0; j < room.columns; j++){
          this.grid[i][j] = this.tables.find(table => table.x == i && table.y == j) || null;
        }
      }
    })
    this.picked = true;
  }

  create(){
    this.tables = [];
    this.grid = new Array(this.rows).fill(null).map(() => new Array(this.columns).fill(null));
    this.picked = true;
  }

  add(table){
    this.tables.push(table);
  }

  delete(table){
    this.deletedTables.push(table);
    this.tables = this.tables.filter(e => e !== table);
  }

  ngOnDestroy(){
    if(this.tableSubscription) this.tableSubscription.unsubscribe();
    this.roomSubscription.unsubscribe();
  }

  save(){
    console.log(this.tables);
    console.log(this.deletedTables);
  }

}
