import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators} from '@angular/forms'
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: 'app-add-new-reservation',
  templateUrl: './add-new-reservation.component.html',
  styleUrls: ['./add-new-reservation.component.scss']
})
export class AddNewReservationComponent implements OnInit {

  confirmReservationIcon=faPlusCircle;

  newReservationForm:FormGroup;

  constructor(private fb:FormBuilder) { }
  reservationID: number;
  tableID: number;
  numberOfSeats: number;
  customerName: string;
  startDate: string;
  endDate: string;
  ngOnInit(): void {

    this.newReservationForm = this.fb.group({
      tableID:[null, Validators.required],
      numberOfSeats:[null, Validators.required],
      customerName:[null, Validators.required],
      startDate:[null, Validators.required],
      endDate:[null, Validators.required],
      
    })
  }
  addReservation(){
    console.log("New Reservation")
  }
}
