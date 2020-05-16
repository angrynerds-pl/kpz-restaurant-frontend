import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TableService } from 'src/app/services/table.service';
import { RoomService } from 'src/app/services/room.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Table } from 'src/app/models/table';
import { Room } from 'src/app/models/room';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-room-editor-main',
  templateUrl: './room-editor-main.component.html',
  styleUrls: ['./room-editor-main.component.scss']
})
export class RoomEditorMainComponent implements OnInit, OnDestroy {

  rooms: Array<Room>; // list of current rooms

  rows:number; // number of rows selected by user from select
  columns: number; // number of columns selected by user from select
  name: string; // name of the room (user input)

  rowsOption: Array<number>; // hardcoded number of rows (select options)
  columnsOption: Array<number>; // hardcoded number of columns (select options)

  grid: Array<Array<Table>>; // grid representation of tables
  tables: Array<Table> = []; // list of tables
  deletedTables: Array<Table> = [] // store of deleted tables (for server DELETE request)

  picked: boolean = false; // show labels after click on edit/add

  currentRoom: Room = {} as Room;

  new: boolean = false; // new room - true, edit room - false

  tableSubscription: Subscription;
  roomSubscription: Subscription;
  addRoomSubscription: Subscription;

  constructor(private tableService:TableService, private roomService:RoomService, 
    private storageService:LocalStorageService, private router:Router, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.rowsOption = Array.from(Array(8).keys()).map(x => x + 3);
    this.columnsOption = Array.from(Array(3).keys()).map(x => x + 2);
    this.roomSubscription = this.roomService.getRooms().subscribe(data => {
      this.rooms = data;
    })
  }

  edit(room: Room){
    this.tableSubscription = this.tableService.getTables(room.id).subscribe(data => {
      this.tables = data;
      this.grid = new Array(room.rows).fill(null).map(() => new Array(room.columns).fill(null));
      for(let i = 0; i < room.rows; i++){
        for(let j = 0; j < room.columns; j++){
          this.grid[i][j] = this.tables.find(table => table.x == i && table.y == j) || null;
        }
      }
    })
    this.picked = true;
    this.currentRoom.id = room.id;
    this.deletedTables = [];
  }

  create(){
    this.tables = [];
    this.deletedTables = [];
    this.grid = new Array(this.rows).fill(null).map(() => new Array(this.columns).fill(null));
    this.currentRoom = { 
      id: null, rows: this.rows, columns: this.columns, name: this.name, restaurantId: this.storageService.getRestaurantId()
    }
    this.rows = this.columns = null; this.name = '';
    this.picked = true;
    this.new = true;
  }

  add(table){
    this.tables.push(table);
  }

  delete(table){
    this.deletedTables.push(table);
    this.tables = this.tables.filter(e => e !== table);
  }

  save(){
    if(this.areTablesCorrect()){
      // new room
      if(this.new){
        this.addRoomSubscription = this.roomService.addRoom(this.currentRoom).subscribe(room => {
          if(room){
            if(this.tables.length > 0){
              this.tables.map(table => table.roomId = room.id);
              this.tableService.addManyTables(this.tables).subscribe(data => {
                console.log(data);
              })
            }
            this.router.navigateByUrl('/manager/statistics', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/manager/room-editor']);
            }); 
          }
        })
      }
      // edit room
      else{
        const updateTables = this.tables.filter(t => t.roomId != null);
        const newTables = this.tables.filter(t => t.roomId == null);
        newTables.map(table => table.roomId = this.currentRoom.id);
        if(newTables.length > 0){
          this.tableService.addManyTables(newTables).subscribe(data => {
            console.log(data);
          });
        }
        if(updateTables.length > 0){
          this.tableService.updateManyTables(updateTables).subscribe(data => {
            console.log(data);
          });
        }
        if(this.deletedTables.length > 0){
          this.tableService.deleteManyTables(this.deletedTables).subscribe(data => {
            console.log(data);
          });
        }
        this.router.navigateByUrl('/manager/statistics', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/manager/room-editor']);
        }); 
      }
    } else {
      alert('Data is incomplete');
    }
  }

  areTablesCorrect(){
    let correct = true;
    this.tables.forEach(t => {
      if(t.seats == null || t.number == null) correct = false;
    })
    return correct;
  }

  deleteRoom(room: Room) {
    this.roomService.deleteRoom(room).subscribe(data => {
      this.toastrService.success('Room has been deleted');
      this.router.navigateByUrl('/manager/statistics', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/manager/room-editor']);
      }); 
    }, err => {
      this.toastrService.error('Error!');
    })
  }

  ngOnDestroy(){
    if(this.tableSubscription) this.tableSubscription.unsubscribe();
    if(this.addRoomSubscription) this.addRoomSubscription.unsubscribe();
    this.roomSubscription.unsubscribe();
  }

}
