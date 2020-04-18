import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { TableService } from './table.service';
import { Observable } from 'rxjs';
import {of as ObservableOf} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders:Order[];
  newOrder:Order;
  constructor(private tableService:TableService) { 
    this.orders=[{orderID:0,tableID:5,orderDate:new Date(), notes:"without sause"}]
  }


  createOrder(tableID, notes){
    
    this.newOrder = {orderID:this.getLastOrderId() , tableID: tableID, orderDate: new Date(),notes};
    this.orders.push( this.newOrder);
    this.tableService.changeStatusOfTable(tableID);
   
    
  }
  editOrder(orderID: number, notes,){
    let order = this.getOrderByID(orderID);
    order.notes = notes;
  }

  getLastOrderId(){
    return this.orders.length;
  }


  getOrderByTableID(tableID: number): Observable<Order> {
    return ObservableOf(this.orders.find((e) => e.tableID == tableID));
    
  }
  getOrderIDByTableID(tableID: number): number {
    return this.orders.find((e) => e.tableID == tableID).orderID;
    
  }

  getOrderByID(orderID: number) {
    return this.orders.find((e) => e.orderID == orderID);
    
  }
}
