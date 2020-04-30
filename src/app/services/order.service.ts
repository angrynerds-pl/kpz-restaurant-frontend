import { Injectable } from '@angular/core';

import { ProductService } from './product.service';
import { MenuProduct } from '../models/menu-product';
import {of as ObservableOf, Observable} from 'rxjs';
import { Order } from '../models/order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {


  products:MenuProduct[];
  orders:Order[];

  constructor() {
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
   }

   getOrders():Observable<Order[]>{
     return ObservableOf(this.orders);
   }

}
