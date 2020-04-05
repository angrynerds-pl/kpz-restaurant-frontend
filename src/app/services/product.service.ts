import { Injectable } from '@angular/core';
import { MenuProduct } from '../models/menu-product';
import {Observable} from 'rxjs';
import {of as ObservableOf} from 'rxjs';
import { MenuCategory } from '../models/menu-category';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products:MenuProduct[];
  constructor() {
    
    this.products = [
      {id:0,name: "Funghi",price: 20, categoryId: 0},
      {id:1,name: "CocaCola",price: 50, categoryId: 1},
      {id:2,name: "Fanta",price: 5, categoryId: 1},
      {id:3,name: "Margherita",price: 45, categoryId: 0},
      {id:4,name: "Sprite",price: 92, categoryId: 1},
      ];
   }

  addProduct(product){
    this.products.push(product);
  }

  
   // getProducts():Observable<MenuProduct[]>{
   // return ObservableOf(this.products);
  //}
  getProducts():Observable<MenuProduct[]>{
    return ObservableOf(this.products);
  }

  getLastProductID(){
    return this.products.length;
    
  }
}
