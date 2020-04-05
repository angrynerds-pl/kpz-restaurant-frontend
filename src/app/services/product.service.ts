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
      new MenuProduct(0,"Funghi",20,0),
      new MenuProduct(1,"CocaCola",50,1),
      new MenuProduct(2,"Fanta",5, 1),
      new MenuProduct(3,"Margherita",45,0),
      new MenuProduct(4,"Sprite",92,1)
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
