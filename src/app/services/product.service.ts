import { Injectable } from '@angular/core';
import { MenuProduct } from '../models/menu-product';
import {Observable} from 'rxjs';
import {of as ObservableOf} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products:MenuProduct[];
  constructor() {
    this.products = [
      new MenuProduct(0,"Funghi",20,0)
    ];
   }

  addProduct(product){
    this.products.push(product);
  }

  
   // getProducts():Observable<MenuProduct[]>{
   // return ObservableOf(this.products);
  //}
  getProducts():MenuProduct[]{
    return this.products;
  }

  getLastProductID(){
    return this.products.length;
    
  }
}
