import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { MenuProduct } from '../models/menu-product';
import {of as ObservableOf, Observable} from 'rxjs';
import { Order } from '../models/order';
import { OrderWaiter } from '../models/order-waiter';
import { TableService } from './table.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {



  products:MenuProduct[];
  orders:Order[];

  
  ordersWaiter:OrderWaiter[];
  newOrder:OrderWaiter;
  constructor(private tableService:TableService) {
    this.orders = [
      {id:1, tableId: 1, date:"2020-04-18 15:00:00", status:true, productsInOrder:[
        {id:1,orderId:1,product:{id:0,name: "Funghi",price: 20, categoryId: 0}, status:1},
        {id:2,orderId:1,product:{id:1,name: "Zupa",price: 30, categoryId: 0}, status:1}
      ]},
      {id:2, tableId: 3, date:"2020-04-18 16:00:00", status:false, productsInOrder:[
        {id:3,orderId:1,product:{id:0,name: "Funghi",price: 20, categoryId: 0}, status:1},
        {id:4,orderId:1,product:{id:1,name: "Zupa",price: 30, categoryId: 0}, status:1},
        {id:4,orderId:1,product:{id:1,name: "Zupa",price: 30, categoryId: 0}, status:1}
      ]},
      {id:3, tableId: 3, date:"2020-04-18 16:00:00", status:false, productsInOrder:[
        {id:3,orderId:1,product:{id:0,name: "Funghi",price: 20, categoryId: 0}, status:1},
        {id:4,orderId:1,product:{id:1,name: "Zupa",price: 30, categoryId: 0}, status:1}
      ]},
      {id:4, tableId: 3, date:"2020-04-18 16:00:00", status:false, productsInOrder:[
        {id:3,orderId:1,product:{id:0,name: "Funghi",price: 20, categoryId: 0}, status:1},
        {id:4,orderId:1,product:{id:1,name: "Zupa",price: 30, categoryId: 0}, status:1}
      ]},
      {id:5, tableId: 3, date:"2020-04-18 16:00:00", status:false, productsInOrder:[
        {id:3,orderId:1,product:{id:0,name: "Funghi",price: 20, categoryId: 0}, status:1},
        {id:4,orderId:1,product:{id:1,name: "Zupa",price: 30, categoryId: 0}, status:1}
      ]},
      {id:6, tableId: 3, date:"2020-04-18 16:00:00", status:false, productsInOrder:[
        {id:3,orderId:1,product:{id:0,name: "Funghi",price: 20, categoryId: 0}, status:1},
        {id:4,orderId:1,product:{id:1,name: "Zupa",price: 30, categoryId: 0}, status:1}
      ]},
      {id:7, tableId: 3, date:"2020-04-18 16:00:00", status:false, productsInOrder:[
        {id:3,orderId:1,product:{id:0,name: "Funghi",price: 20, categoryId: 0}, status:1},
        {id:4,orderId:1,product:{id:1,name: "Zupa",price: 30, categoryId: 0}, status:1},
        {id:4,orderId:1,product:{id:1,name: "Zupa",price: 30, categoryId: 0}, status:1},
        {id:4,orderId:1,product:{id:1,name: "Zupa",price: 30, categoryId: 0}, status:1}
      ]}
    ]
    this.ordersWaiter=[{orderID:0,tableID:5,orderDate:new Date(), notes:"without sause"},
    {orderID:1,tableID:4,orderDate:new Date(), notes:""}]
   }

   getOrders():Observable<Order[]>{
     return ObservableOf(this.orders);
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
