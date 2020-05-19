import { Component, OnInit, OnDestroy, Input, Inject } from "@angular/core";
import { RoomService } from "src/app/services/room.service";
import { TableService } from "src/app/services/table.service";
import { Room } from "src/app/models/room";
import { Table } from "src/app/models/table";
import { Subscription } from "rxjs";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { Router } from "@angular/router";
import { Reservation } from "src/app/models/reservation";
import { FormControl } from "@angular/forms";
import { ReservationService } from "src/app/services/reservation.service";
import { MAT_BOTTOM_SHEET_DATA } from "@angular/material/bottom-sheet";
@Component({
  selector: "app-check-reservations",
  templateUrl: "./check-reservations.component.html",
  styleUrls: ["./check-reservations.component.scss"],
})
export class CheckReservationsComponent implements OnInit, OnDestroy {
  rooms: Array<Room>;
  tables: Array<Table>;
  currentRoom: Room;
  currentID: number;
  grid: Array<Array<Table>>;
  newDate: Date = new Date();

  reservationDatetime: Date = new Date();

  newReservation: Reservation = {} as Reservation;

  selectedDate = new FormControl(new Date());

  roomSubscription: Subscription;
  tableSubscription: Subscription;
  reservationSubcription: Subscription;

  tablesSeats: Array<number> = new Array();
  tablesBySeatAmount: Array<any> = new Array();
  seatNumber: number = 1;

  currentReservations: Reservation[];

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private reservationsService: ReservationService,
    private roomService: RoomService,
    private tableService: TableService,
  ) {}

  ngOnInit(): void {
    this.roomSubscription = this.roomService.getRooms().subscribe((data) => {
      this.rooms = data;
      if (this.rooms.length > 0) {
        this.currentID = this.rooms[0].id;
        this.setTables();
      }
    });

    this.newReservation.startDate = this.reservationDatetime;
    this.reservationSubcription = this.reservationsService
      .getReservationsByDatetime(this.reservationDatetime)
      .subscribe((data) => {
        this.currentReservations = data;
      });
  }

  setTables() {
    this.currentRoom = this.rooms.find((e) => e.id === this.currentID);
    this.tableSubscription = this.tableService
      .getTables(this.currentRoom.id)
      .pipe()
      .subscribe((data) => {
        this.tables = data;
        this.tables.forEach((table) => {
          if (this.tablesSeats.some((number) => table.seats == number)) {
          } else {
            this.tablesSeats.push(table.seats);
          }
        });

        this.tablesSeats.sort();
        this.seatNumber = this.tablesSeats[0];
        this.chooseTablesBySeats(this.seatNumber);
        this.gridEditing(this.tables);
      });
  }

  gridEditing(tables) {
    this.grid = new Array(this.currentRoom.rows)
      .fill(null)
      .map(() => new Array(this.currentRoom.columns).fill(null));
    for (let i = 0; i < this.currentRoom.rows; i++) {
      for (let j = 0; j < this.currentRoom.columns; j++) {
        this.grid[i][j] =
          tables.find((table) => table.x == i && table.y == j) || null;
      }
    }
  }
  chooseTablesBySeats(seatsAmount: number) {
    this.tablesBySeatAmount = new Array();
    this.tables.forEach((table) => {
      if (table.seats == seatsAmount) {
        this.tablesBySeatAmount.push({ tableId: table.id, filtered: true });
      }
      {
        this.tablesBySeatAmount.push({ tableId: table.id, filtered: false });
      }
    });
  }

  ngOnDestroy(): void {
    this.roomSubscription.unsubscribe();
    this.tableSubscription.unsubscribe();
    this.reservationSubcription.unsubscribe();
  }

  checkReservations(event) {
    this.reservationSubcription = this.reservationsService
      .getReservationsByDatetime(this.reservationDatetime)
      .subscribe((data) => {
        this.currentReservations = data;
      });
  }

  updateAvailableTables() {
    this.reservationSubcription = this.reservationsService
      .getReservationsByDatetime(this.reservationDatetime)
      .subscribe((data) => {
        this.currentReservations = data;
      });
  }

  checkTable(table: Table) {
    if (!table) return 0;

    let foundTable = this.tablesBySeatAmount.find((t) => {
      if (t.tableId == table.id) {
        return t;
      }
    });

    if (!foundTable) return 0;
    if (foundTable.filtered) {
      return 1;
    } else {
      return 2;
    }
  }
}
