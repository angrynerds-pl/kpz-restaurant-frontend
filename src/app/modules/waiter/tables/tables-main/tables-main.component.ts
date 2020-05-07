import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { TableService } from 'src/app/services/table.service';
import { Room } from 'src/app/models/room';
import { Table } from 'src/app/models/table';
import { Subscription } from 'rxjs';
import { faBars } from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: 'app-tables',
  templateUrl: './tables-main.component.html',
  styleUrls: ['./tables-main.component.scss']
})
export class TablesMainComponent implements OnInit, OnDestroy {

  menuIcon = faBars;
  rooms: Array<Room>;
  tables: Array<Table>;
  currentRoom: Room;
  currentID: number;
  grid: Array<Array<Table>>;

  roomSubscription: Subscription;
  tableSubscription: Subscription;

  constructor(private roomService:RoomService, private tableService:TableService) { }

  ngOnInit(): void {
    this.roomSubscription = this.roomService.getRooms().subscribe(data => {
      this.rooms = data;
      if(this.rooms.length > 0){
        this.currentID = this.rooms[0].id;
        this.setTables();
      }
    })
  }

  setTables(){
    this.currentRoom = this.rooms.find(e => e.id === this.currentID);
    this.tableSubscription = this.tableService.getTables(this.currentRoom.id).subscribe(data => {
      this.tables = data;
      this.grid = new Array(this.currentRoom.rows).fill(null).map(() => new Array(this.currentRoom.columns).fill(null));
      for(let i = 0; i < this.currentRoom.rows; i++){
        for(let j = 0; j < this.currentRoom.columns; j++){
          this.grid[i][j] = this.tables.find(table => table.x == i && table.y == j) || null;
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.roomSubscription.unsubscribe();
    this.tableSubscription.unsubscribe();
  }

}
