import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { TableService } from 'src/app/services/table.service';
import { Room } from 'src/app/models/room';
import { Table } from 'src/app/models/table';

@Component({
  selector: 'app-tables',
  templateUrl: './tables-main.component.html',
  styleUrls: ['./tables-main.component.scss']
})
export class TablesMainComponent implements OnInit {

  rooms: Array<Room>;
  tables: Array<Table>;
  currentRoom: Room;
  currentID: number;
  grid: Array<Array<Table>>;

  constructor(private roomService:RoomService, private tableService:TableService) { }

  ngOnInit(): void {
    this.roomService.getRooms().subscribe(data => {
      this.rooms = data;
    })
    if(this.rooms.length > 0){
      this.currentID = this.rooms[0].roomID;
      this.setTables();
    }
  }

  setTables(){
    this.currentRoom = this.rooms.find(e => e.roomID === this.currentID);
    this.tableService.getTables(this.currentRoom.roomID).subscribe(data => {
      this.tables = data;
      this.grid = new Array(this.currentRoom.rows).fill(null).map(() => new Array(this.currentRoom.columns).fill(null));
      for(let i = 0; i < this.currentRoom.rows; i++){
        for(let j = 0; j < this.currentRoom.columns; j++){
          this.grid[i][j] = this.tables.find(table => table.x == i && table.y == j) || null;
        }
      }
    })
  }

}
