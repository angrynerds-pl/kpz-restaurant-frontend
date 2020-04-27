import { Injectable } from '@angular/core';
import { OrderWaiter } from '../models/order-waiter';
import { TableService } from './table.service';
import { Observable } from 'rxjs';
import {of as ObservableOf} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  ordersWaiter:OrderWaiter[];
  newOrder:OrderWaiter;
  constructor(private tableService:TableService) { 
    this.ordersWaiter=[{orderID:0,tableID:5,orderDate:new Date(), notes:"without sause"}]
  }


  createOrder(tableID, notes){
    
    this.newOrder = {orderID:this.getLastOrderId() , tableID: tableID, orderDate: new Date(),notes};
    this.ordersWaiter.push( this.newOrder);
    this.tableService.changeStatusOfTable(tableID);
   
    
  }
  editOrder(orderID: number, notes,){
    let order = this.getOrderByID(orderID);
    order.notes = notes;
  }

  getLastOrderId(){
    return this.ordersWaiter.length;
  }


  getOrderByTableID(tableID: number): Observable<OrderWaiter> {
    return ObservableOf(this.ordersWaiter.find((e) => e.tableID == tableID));
    
  }
  getOrderIDByTableID(tableID: number): number {
    return this.ordersWaiter.find((e) => e.tableID == tableID).orderID;
    
  }

  getOrderByID(orderID: number) {
    return this.ordersWaiter.find((e) => e.orderID == orderID);
    
  }
}
