import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder,Validators} from '@angular/forms'
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { TableService } from 'src/app/services/table.service';
import { Subscription } from 'rxjs';
import { Table } from 'src/app/models/table';
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { ToastrService } from "ngx-toastr";
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation.service';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-add-new-reservation',
  templateUrl: './add-new-reservation.component.html',
  styleUrls: ['./add-new-reservation.component.scss']
})
export class AddNewReservationComponent implements OnInit {

  confirmReservationIcon=faPlusCircle;

  reservation:Reservation;

  newReservationForm:FormGroup;
  tableNumbers:Number[] = [];
  table:Table;
  reservationId: number;
  tablesSubscription:Subscription;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,private reservationService:ReservationService,private fb:FormBuilder,private toastrService: ToastrService, private bottomSheetRef:MatBottomSheetRef, private tableService :TableService) { }
  
  
  ngOnInit(): void {
    this.reservation = this.data.reservationDetails;
    this.table = this.data.tableDetails;
    console.log('this.data.reservationDetails',this.data.reservationDetails)
    this.newReservationForm = this.fb.group({
      tableId:[this.table.id, Validators.required],
      numberOfSeats:[this.table.seats, [Validators.required,Validators.pattern("^[1-9]*$"),  Validators.min(1), Validators.max(this.table.seats)]],
      customerName:[null, Validators.required],
      startDate:[this.reservation.startDate, Validators.required],
      endDate:[this.reservation.endDate, Validators.required],
      
    })

    this.tablesSubscription = this.tableService.getTablesID().subscribe((tableNumbers)=>{
      this.tableNumbers = tableNumbers
    })
  }
  addReservation(){
    if (this.newReservationForm.valid) {
      //this.reservationId = this.reservationService.getLastReservationID();
      //this.reservation = Object.assign({}, this.newReservationForm.value);
      //this.reservation.reservationId = this.reservationId;
      //console.log(this.reservation);
      //this.reservationService.addReservation(this.reservation);

      //this.resetForm();
      this.toastrService.success("Reservation added!");
      this.closeBottomSheet();
    }else{
      this.toastrService.error("Reservation data incorrect!");
    }
  }
  closeBottomSheet() {
    
    this.bottomSheetRef.dismiss();
  }
}
