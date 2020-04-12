import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'src/app/models/table';
import { TableService } from 'src/app/services/table.service';
import { Subscription } from 'rxjs';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { faTimes} from  "@fortawesome/free-solid-svg-icons";
import { faPlusCircle} from  "@fortawesome/free-solid-svg-icons";
import { faFileInvoiceDollar} from  "@fortawesome/free-solid-svg-icons";
import { TableAddOrderComponent} from  "../table-add-order/table-add-order.component";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  id: number;
  buttonBack =faTimes;
  iconPlusCircle =  faPlusCircle;
  iconBill = faFileInvoiceDollar;
  table:Table = {} as Table;

  routeSubscription: Subscription;
  tableSubscription: Subscription;

  constructor(private route:ActivatedRoute, private tableService:TableService, private _bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(data => {
      this.id = data.id;
    })
    this.tableSubscription = this.tableService.getTable(this.id).subscribe(data => {
      this.table = data;
    })
  }

  getClass() {
    switch(this.table.status){
      case 'free':
        return 'free';
      case 'serve':
        return 'serve';
      case 'occupied':
        return 'occupied';
    }
  }

  ngOnDestroy(){
    this.routeSubscription.unsubscribe();
    this.tableSubscription.unsubscribe();
  }

  openBottomSheet(): void {
    this._bottomSheet.open(TableAddOrderComponent);
  }

}
