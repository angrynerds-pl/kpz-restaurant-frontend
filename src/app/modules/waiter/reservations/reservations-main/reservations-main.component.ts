import { Component, OnInit, OnDestroy } from "@angular/core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { CheckReservationsComponent } from "../check-reservations/check-reservations.component";
import { Reservation } from "src/app/models/reservation";
import { Subscription, Observable } from "rxjs";
import { ReservationService } from "src/app/services/reservation.service";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-reservations",
  templateUrl: "./reservations-main.component.html",
  styleUrls: ["./reservations-main.component.scss"],
})
export class ReservationsMainComponent implements OnInit, OnDestroy {
  menuIcon = faBars;
  plusIcon = faPlus;
  reservations: Observable<Array<Reservation>>;

  reservationsSubscription: Subscription;

  constructor(
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private _bottomSheet: MatBottomSheet,
    private reservationService: ReservationService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {
    this.updateReservations();
  }

  ngOnDestroy(): void {}

  logout() {
    this.localStorageService.logout();
    this.router.navigate(["/login"]);
  }

  checkReservations() {
    let role = this.localStorageService.getRole();
    if (role == "HEAD_WAITER") {
      this._bottomSheet._openedBottomSheetRef = this._bottomSheet.open(
        CheckReservationsComponent,
        {
          data: { reservations: this.reservations },
          disableClose: false,
        }
      );
    } else {
      this.toastrService.warning("You don't have permission");
    }
  }
  
  updateReservations() {
    this.reservations = this.reservationService.getReservations();
  }
}
