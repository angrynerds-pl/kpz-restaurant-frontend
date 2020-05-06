import { Injectable, DebugElement } from '@angular/core';
import { ProductService } from './product.service';
import {MenuCategory} from '../models/menu-category';
import {Observable} from 'rxjs';
import {of as ObservableOf} from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { OrderWaiter } from '../models/order-waiter';
import { MenuProduct } from '../models/menu-product';
import { Order } from '../models/order';
import { TableService } from './table.service';

import { HttpParams } from '@angular/common/http';
import { Local } from 'protractor/built/driverProviders';
import { ProductsInOrder } from '../models/products-in-order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  host: string =environment.host;
  products:MenuProduct[];

  orders:Order[];
// categories and products from database, waiting on endpoints to connect with tables

  
  ordersWaiter:Order[];
  newOrder:Order;

  constructor(private tableService:TableService, private http:HttpClient, private storageService:LocalStorageService) {

   }
   getOrders () : Observable<Array<Order>> {
     return this.http.get<Array<Order>>(this.host + 'api/orders',{
     headers : new HttpHeaders().set('Authorization', 'Bearer '+ this.storageService.getToken()),
    });    
   }
   updateStatus (orderedProduct:ProductsInOrder) : Observable<ProductsInOrder> { 
     console.log(orderedProduct);
    return this.http.put<ProductsInOrder>(this.host + 'api/orders/products/',orderedProduct, {  
    headers : new HttpHeaders().set('Authorization', 'Bearer '+ this.storageService.getToken()),
   });    
  }


  createOrder(tableId, note){
    
    //this.newOrder = {id:this.getLastOrderId() , tableID: tableID, orderDate: new Date(),notes};
    //this.ordersWaiter.push( this.newOrder);
    //this.tableService.changeStatusOfTable(tableID);
    //return this.http.post(this.host + 'api/login/authenticate', {
    //  Username: username,
    //  Password: password
    //});
    //return this.http.post(this.host + 'api/orders/authenticate', {
     // tableId: tableId,
    //  Password: password,
     // note:,
      
    //);
  }
  
  editOrder(orderID: number, notes,){
    let order = this.getOrderByID(orderID);
   // order.notes = notes;
  }

  getLastOrderId(){
    return this.ordersWaiter.length;
  }


  getOrderByTableID(tableID: number): Observable<Order> {
    return ObservableOf(this.ordersWaiter.find((e) => e.tableId == tableID));
    
  }
  getOrderIDByTableID(tableID: number): number {
    return this.ordersWaiter.find((e) => e.tableId == tableID).id;
    
  }

  getOrderByID(orderId: number) {
    return this.ordersWaiter.find((e) => e.id == orderId);
    
  }

}
