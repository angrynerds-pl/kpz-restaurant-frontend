import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { MenuProduct } from '../models/menu-product';
import {of as ObservableOf, Observable} from 'rxjs';
import { Order } from '../models/order';
import { OrderWaiter } from '../models/order-waiter';
import { TableService } from './table.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Local } from 'protractor/built/driverProviders';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  host: string =environment.host;
  products:MenuProduct[];
  
  ordersWaiter:OrderWaiter[];
  newOrder:OrderWaiter;
  constructor(private tableService:TableService, private http:HttpClient, private storageService:LocalStorageService) {
   }
   getOrders () : Observable<Array<Order>> {
     return this.http.get<Array<Order>>(this.host + 'api/orders',{
     headers : new HttpHeaders().set('Authorization', 'Bearer '+ this.storageService.getToken()),
    });    
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
