import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { TableService } from 'src/app/services/table.service';
import { Room } from 'src/app/models/room';
import { Table } from 'src/app/models/table';
import { Subscription } from 'rxjs';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';
import { Reservation } from 'src/app/models/reservation';
import { FormControl } from '@angular/forms';
import { ReservationService } from 'src/app/services/reservation.service';
@Component({
  selector: 'app-check-reservations',
  templateUrl: './check-reservations.component.html',
  styleUrls: ['./check-reservations.component.scss']
})
export class CheckReservationsComponent implements OnInit, OnDestroy {

  rooms: Array<Room>;
  tables: Array<Table>;
  currentRoom: Room;
  currentID: number;
  grid: Array<Array<Table>>;
  newDate:Date = new Date();
  
  reservationDatetime:Date =new Date();

  newReservation: Reservation = {} as Reservation;

  selectedDate = new FormControl(new Date());

  roomSubscription: Subscription;
  tableSubscription: Subscription;

  tablesSeats:Array<number> = new Array();
  tablesBySeatAmount:Array<Table>;
  seatNumber:number;

  constructor(private reservationsService:ReservationService,private router:Router, private roomService:RoomService, private tableService:TableService, private localStorageService:LocalStorageService) { }

  ngOnInit(): void {

    
    //this.reservationDatetime =  new Date();

    this.roomSubscription = this.roomService.getRooms().subscribe(data => {
      this.rooms = data;
      if(this.rooms.length > 0){
        this.currentID = this.rooms[0].id;
        this.setTables();
      }
    })
    
    
    this.newReservation.tableId =1;
    this.newReservation.numberOfSeats =2;
    this.newReservation.startDate = this.reservationDatetime;
    
    
  }

  setTables(){
    this.currentRoom = this.rooms.find(e => e.id === this.currentID);
    this.tableSubscription = this.tableService.getTables(this.currentRoom.id).pipe().subscribe(data => {
      
      this.tables = data;
      this.tables.forEach( table =>{
        if(this.tablesSeats.some((number)=> table.seats == number)){}
        else{
        this.tablesSeats.push(table.seats)
        this.seatNumber = this.tablesSeats[0];
      }});
      this.tablesSeats.sort();
      this.seatNumber = this.tablesSeats[0];
      this.chooseTablesBySeats(this.seatNumber);
      //this.gridEditing(this.tables);
    });
  }
  
  gridEditing(tables){
    this.grid = new Array(this.currentRoom.rows).fill(null).map(() => new Array(this.currentRoom.columns).fill(null));
    for(let i = 0; i < this.currentRoom.rows; i++){
      for(let j = 0; j < this.currentRoom.columns; j++){
        this.grid[i][j] = tables.find(table => table.x == i && table.y == j) || null;
      }
    }
  
  }
  chooseTablesBySeats(seatsAmount:number){
    this.tablesBySeatAmount = this.tables.filter((table) => table.seats===seatsAmount);
    this.gridEditing(this.tablesBySeatAmount);
  }
 
  ngOnDestroy(): void {
    this.roomSubscription.unsubscribe();
    this.tableSubscription.unsubscribe();
  }

  checkReservations(event){
    console.log(this.reservationDatetime);
    this.reservationsService.getReservationsByDatetime(this.reservationDatetime).subscribe();
  }
  
}
