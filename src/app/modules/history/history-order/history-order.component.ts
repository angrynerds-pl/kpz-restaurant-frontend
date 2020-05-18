import { Component, OnInit, Input } from '@angular/core';
import { MenuProduct } from 'src/app/models/menu-product';
import { Order } from 'src/app/models/order';
import { DateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-history-order',
  templateUrl: './history-order.component.html',
  styleUrls: ['./history-order.component.scss']
})
export class HistoryOrderComponent implements OnInit {

  @Input() order:Order;
  showProducts:boolean =false;

  constructor() {}


  ngOnInit(): void {
  }

  showOrHideProducts(){
    this.showProducts ? this.showProducts=false : this.showProducts=true;
  }

}
