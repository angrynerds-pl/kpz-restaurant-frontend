import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Order } from '../models/order';
import { TableService } from './table.service';
import { ProductsInOrder } from '../models/products-in-order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  host: string =environment.host;
  
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
  
  /*export interface Order {
    id: number;
    tableId: number;
    table: Table;
    waiterId: number;
    orderDate: Date;
    status: boolean; 
    orderedProducts: Array<ProductsInOrder>;  
    note: string;
}*/
//POST order
  createOrder(table, waiterId,orderedProducts,note){
    
    return this.http.post(this.host + 'api/orders', {
      tableId: table.id,
      table:table,
      orderDate: new Date(),
      waiterId: waiterId,
      status: 'In progress',
      orderedProducts:orderedProducts,
      note: note,
    }
    );
  }
  //GET order details by TableId
  getOrderByTableId(tableId: number): Observable<Order> {
    return this.http.get<Order>(this.host + 'api/orders/table/'+tableId,{
      headers : new HttpHeaders().set('Authorization', 'Bearer '+ this.storageService.getToken()),
     });  
  }
  
  //PATCH or PUT order
  editOrder(orderId: number, orderedProducts,note){
    
    return this.http.put<Order>(this.host + 'api/orders/'+orderId, {  
      
      orderedProducts:orderedProducts,
      note:note
     });  
  }

  //GET order by orderId
  getOrderById(orderId: number) {
    return this.http.get<Order>(this.host + 'api/orders/'+orderId,{
      headers : new HttpHeaders().set('Authorization', 'Bearer '+ this.storageService.getToken()),
     });  
    
  }
  //POST produkty do zamówienia
  addProductsToOrder(orderedProducts) {
    return this.http.post(this.host + 'api/orders/products', {
      
      orderedProducts:orderedProducts,
    }
    );
  }
}
