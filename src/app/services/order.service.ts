import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Order } from '../models/order';
import { TableService } from './table.service';
import { ProductsInOrder } from '../models/products-in-order';

import { Identifiers } from '@angular/compiler';
import { ProductToAdd } from '../models/product-to-add';


import { ProductToAdd } from '../models/product-to-add';



@Injectable({
  providedIn: 'root'
})
export class OrderService {

  
  host: string =environment.host;

  products:MenuProduct[]; 
  ordersWaiter:OrderWaiter[];
  newOrder:OrderWaiter;

  productsToAdd:ProductsInOrder[] = [];

  constructor(private tableService:TableService, private http:HttpClient, private storageService:LocalStorageService) {

   }
   getOrders () : Observable<Array<Order>> {
     return this.http.get<Array<Order>>(this.host + 'api/orders/inprogress',{
     headers : new HttpHeaders().set('Authorization', 'Bearer '+ this.storageService.getToken()),
    });    
   }
   updateOrderStatus(order:Order) : Observable<any>{
    console.log(this.host + 'api/orders/'+order.id+'/'+order.status +"token: "+ this.storageService.getToken());
    return this.http.put<any>(this.host + 'api/orders/'+order.id+'/'+order.status, {}, {  
      headers : new HttpHeaders().set('Authorization', 'Bearer '+ this.storageService.getToken()),
     });    
    }

   updateStatus (orderedProduct:ProductsInOrder) : Observable<ProductsInOrder> { 
    console.log(orderedProduct);
    return this.http.put<ProductsInOrder>(this.host + 'api/orders/products/'+orderedProduct.id,orderedProduct, {  
    headers : new HttpHeaders().set('Authorization', 'Bearer '+ this.storageService.getToken()),
   });    
  } 
  createOrder(tableId:number, waiterId:number, orderedProducts,note:string){

  getOrdersHistory (year:number, month:number,day:number) : Observable<Array<Order>>
  {
    console.log(this.host + 'api/orders/history/'+year+"/"+month+"/"+day);
    return this.http.get<Array<Order>>(this.host + 'api/orders/history/'+year+"/"+month+"/"+day,  {
      headers : new HttpHeaders().set('Authorization', 'Bearer '+ this.storageService.getToken()),
     });    
  }
  createOrder(tableID, notes){
    
    this.newOrder = {orderID:this.getLastOrderId() , tableID: tableID, orderDate: new Date(),notes};
    this.ordersWaiter.push( this.newOrder);
    this.tableService.changeStatusOfTable(tableID);

    
    //new Date + two hours 
      var dt = new Date();
      dt.setHours( dt.getHours() + 2 );

     //waiterId = this.storageService.getRole();
    return this.http.post<Order>(this.host + 'api/orders',{
      tableId: tableId,
      waiterId: waiterId,
      note: note,
      status:'IN_PROGRESS',
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
  editOrder(order:Order): Observable<Order>{

    return this.http.put<Order>(this.host + 'api/orders/'+order.id,order ,{  
      headers : new HttpHeaders().set('Authorization', 'Bearer '+ this.storageService.getToken()),
      
     });  
  }


  //GET order by orderId
  getOrderById(orderId: number) {
    return this.http.get<Order>(this.host + 'api/orders/'+orderId,{
      headers : new HttpHeaders().set('Authorization', 'Bearer '+ this.storageService.getToken()),
     });  

    
  }

  editOrderProducts(order:Order, productsToOrder:Array<ProductToAdd>){

    
       ////let currentId = order.orderedProducts.length +1;
       this.productsToAdd=order.orderedProducts;
       

       let productsToAdd = new Array();
       let productToAdd;
       console.log(productsToOrder);
       productsToOrder.forEach(element => {
        let amountOfProductsInOrder = order.orderedProducts.filter((e) => e.productId === element.product.id);
        console.log('amountOfProductsInOrder', amountOfProductsInOrder)
        console.log('element.amount', element.amount)
        if(amountOfProductsInOrder.length < element.amount){
  
            for(let i=amountOfProductsInOrder.length;i<element.amount;i++){
          
              productToAdd = {orderId:order.id,productId:element.product.id, status:'IN_PROGRESS'};
              productsToAdd.push(productToAdd);
              this.addProductToOrder(productsToAdd).subscribe();
              productsToAdd = new Array();
            }
    }
      else if(amountOfProductsInOrder.length > element.amount){
        
        for(let i=element.amount;i<amountOfProductsInOrder.length;i++){
          console.log("Do usuniecia",amountOfProductsInOrder[i])
          console.log("Do usuniecia",amountOfProductsInOrder[i].id)
          this.deleteProductFromOrder(amountOfProductsInOrder[i].id).subscribe();
        }
      }
  });
  
  return this.http.get<Order>(this.host + 'api/orders/'+order.id,{
    headers : new HttpHeaders().set('Authorization', 'Bearer '+ this.storageService.getToken()),
   });  
 }
    
  removeProductFromOrder(id,array) {
    //let productsIndex = this.findProductsInOrder(id,array); 

    //array.splice(productsIndex, 1);
  }

  addProductToOrder(array) {
    return this.http.post(this.host + 'api/orders/products/',array,{
      headers : new HttpHeaders().set('Authorization', 'Bearer '+ this.storageService.getToken()),
   }
   );
  }

  //PUT produkty do zamówienia
  addProductsToOrder(orderId:number, productsToOrder:Array<ProductToAdd>) {
    
    
    let productsToAdd = new Array();
    let productToAdd;
    productsToOrder.forEach(element => {
      
        for(let i=0;i<element.amount;i++){
          
          productToAdd = {orderId:orderId,productId:element.product.id, status:'IN_PROGRESS'};
          productsToAdd.push(productToAdd);
         
        }
    });
    
    return this.http.post(this.host + 'api/orders/products/',productsToAdd,{
      headers : new HttpHeaders().set('Authorization', 'Bearer '+ this.storageService.getToken()),
   }
   );
  }


  deleteProductFromOrder(productInOrderId:number){


    return this.http.delete(this.host + 'api/orders/products/'+productInOrderId,{
      headers : new HttpHeaders().set('Authorization', 'Bearer '+ this.storageService.getToken()),
   }
   );
  }
}
