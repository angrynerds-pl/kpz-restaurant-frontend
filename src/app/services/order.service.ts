import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Order } from '../models/order';
import { TableService } from './table.service';
import { ProductsInOrder } from '../models/products-in-order';
import { ProductToAdd } from '../models/product-to-add';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  
  host: string =environment.host;
  

  productToAdd:ProductsInOrder = null;
  productsToAdd:ProductsInOrder[] = [];

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
  
  
  createOrder(tableId:number, waiterId:number, orderedProducts,note:string){
    
    //new Date + two hours 
      var dt = new Date();
      dt.setHours( dt.getHours() + 2 );

     //waiterId = this.storageService.getRole();
    return this.http.post<Order>(this.host + 'api/orders',{
      tableId: tableId,
      waiterId: waiterId,
      note: note,
      orderDate:dt
    },{
      headers : new HttpHeaders().set('Authorization', 'Bearer '+ this.storageService.getToken()),
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
  addProductsToOrder(orderId:number, productsToOrder:Array<ProductToAdd>) {
    
    let counterId = 1;
    productsToOrder.forEach(element => {
      
        for(let i=0;i<element.amount;i++){
          
          this.productToAdd = {id:counterId,orderId:orderId,productId:element.product.id, product:element.product,status:'In progress'};
          this.productsToAdd.push(this.productToAdd);
          counterId++;
        }
    });
    
    return this.http.post(this.host + 'api/orders/products/'+orderId, {
      orderedProducts:this.productsToAdd
    },{
      headers : new HttpHeaders().set('Authorization', 'Bearer '+ this.storageService.getToken()),
   }
   );
  }
}
