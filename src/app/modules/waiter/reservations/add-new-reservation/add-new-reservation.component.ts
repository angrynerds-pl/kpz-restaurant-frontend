import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators} from '@angular/forms'
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { TableService } from 'src/app/services/table.service';
import { Subscription } from 'rxjs';
import { Table } from 'src/app/models/table';
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { ToastrService } from "ngx-toastr";
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-add-new-reservation',
  templateUrl: './add-new-reservation.component.html',
  styleUrls: ['./add-new-reservation.component.scss']
})
export class AddNewReservationComponent implements OnInit {

  confirmReservationIcon=faPlusCircle;

  newReservationForm:FormGroup;
  reservation:Reservation;
  tableNumbers:Number[] = [];
  reservationID: number;
  tablesSubscription:Subscription;

  constructor(private reservationService:ReservationService,private fb:FormBuilder,private toastrService: ToastrService, private bottomSheetRef:MatBottomSheetRef, private tableService :TableService) { }
  
  
  ngOnInit(): void {

    this.newReservationForm = this.fb.group({
      tableID:[null, Validators.required],
      numberOfSeats:[null, [Validators.required,Validators.pattern("^[0-9]*$"),  Validators.min(1)]],
      customerName:[null, Validators.required],
      startDate:[new Date(), Validators.required],
      endDate:[null, Validators.required],
      
    })

    this.tablesSubscription = this.tableService.getTablesID().subscribe((tableNumbers)=>{
      this.tableNumbers = tableNumbers
    })
  }
  addReservation(){
    if (this.newReservationForm.valid) {
      this.reservationID = this.reservationService.getLastReservationID();
      this.reservation = Object.assign({}, this.newReservationForm.value);
      this.reservation.reservationID = this.reservationID;
      console.log(this.reservation);
      this.reservationService.addReservation(this.reservation);

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
