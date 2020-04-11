import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { MenuProduct } from '../models/menu-product';
import {of as ObservableOf, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  products:MenuProduct[];

  constructor() {
    this.products = [
      {id:0,name: "Funghi",price: 20, categoryId: 0},
      {id:1, name:"CocaCola",price: 30,categoryId:1}
    ]
   }


   getProducts ():Observable<MenuProduct[]>{
    return ObservableOf(this.products);
   }
}
