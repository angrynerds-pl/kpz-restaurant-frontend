import { Injectable } from '@angular/core';
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


@Injectable({
  providedIn: 'root'
})
export class OrderService {



  products:MenuProduct[];
  orders:Order[];

  
  ordersWaiter:OrderWaiter[];
  newOrder:OrderWaiter;
  host: string = environment.host;

  
  constructor(private http:HttpClient,private tableService:TableService, private storageService:LocalStorageService) {
    
  
    
   }

   
  
   getOrders(): Observable<Array<OrderWaiter>>{
     return this.http.get<Array<OrderWaiter>>(this.host+'api/orders', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storageService.getToken()),
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
    order.notes = notes;
  }

  getLastOrderId(){
    return this.ordersWaiter.length;
  }


  getOrderByTableID(tableID: number): Observable<OrderWaiter> {
    return ObservableOf(this.ordersWaiter.find((e) => e.tableId == tableID));
    
  }
  getOrderIDByTableID(tableID: number): number {
    return this.ordersWaiter.find((e) => e.tableId == tableID).id;
    
  }

  getOrderByID(orderId: number) {
    return this.ordersWaiter.find((e) => e.id == orderId);
    
  }

}
