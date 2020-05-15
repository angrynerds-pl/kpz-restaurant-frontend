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
    return this.http.put<ProductsInOrder>(this.host + 'api/orders/products/'+orderedProduct.id,orderedProduct, {  
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
    
       let currentId = order.orderedProducts.length +1;
       this.productsToAdd=order.orderedProducts;
       console.log('order.orderedProducts',order.orderedProducts)
       console.log('productsToOrder',productsToOrder)
       productsToOrder.forEach(element => {
        let amountOfProductsInOrder =  order.orderedProducts.filter((e) => e.product.id === element.product.id);
         if(amountOfProductsInOrder.length < element.amount){
   
             for(let i=amountOfProductsInOrder.length;i<element.amount;i++){
           
               this.productToAdd = {id:currentId,orderId:order.id,productId:element.product.id,product:element.product,status:'IN_PROGRESS'};
               order.orderedProducts.push(this.productToAdd);
               currentId++;
             }
     }
       else if(amountOfProductsInOrder.length > element.amount){
         
         for(let i=element.amount;i<amountOfProductsInOrder.length;i++){
           console.log(amountOfProductsInOrder[0].product.id);
           this.removeProductFromOrder(amountOfProductsInOrder[0].product.id,order.orderedProducts);
         }
       }
   });
   console.log('this.order.orderedProducts api',order.orderedProducts)
   return this.http.put(this.host + 'api/orders/products/',order.orderedProducts,{
    headers : new HttpHeaders().set('Authorization', 'Bearer '+ this.storageService.getToken()),
 }
 );
    
  }

  removeProductFromOrder(id,array) {
    let productsIndex = this.findProductsInOrder(id,array); 

    array.splice(productsIndex, 1);
  }

  findProductsInOrder(id,array) {
    let index = array.findIndex(
      (product) => product.productId === id
    );

    return index;
  }

  //PUT produkty do zamówienia
  addProductsToOrder(orderId:number, productsToOrder:Array<ProductToAdd>) {
    
    let counterId = 1;
    this.productsToAdd=new Array();
    productsToOrder.forEach(element => {
      
        for(let i=0;i<element.amount;i++){
          
          this.productToAdd = {id:counterId,orderId:orderId,productId:element.product.id, product:element.product,status:'IN_PROGRESS'};
          this.productsToAdd.push(this.productToAdd);
          counterId++;
        }
    });
    
    console.log('this.productsToAdd',this.productsToAdd)
    return this.http.put(this.host + 'api/orders/products',this.productsToAdd,{
      headers : new HttpHeaders().set('Authorization', 'Bearer '+ this.storageService.getToken()),
   }
   );
  }
}
