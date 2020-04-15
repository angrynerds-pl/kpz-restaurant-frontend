import { Injectable } from '@angular/core';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders:Order[]=[];
  newOrder:Order;
  constructor() { 
    this.orders=[]
  }


  createOrder(tableID){
    
    this.newOrder = {orderID:this.getLastOrderId() , tableID: tableID, orderDate: new Date() };
    this.orders.push( this.newOrder);
    
  }

  getLastOrderId(){
    return this.orders.length;
  }
}
