import { Injectable } from '@angular/core';
import { ProductInOrder } from '../models/product-in-order';

@Injectable({
  providedIn: 'root'
})
export class ProductsInOrderService {

  productsInOrder:Array<ProductInOrder> = new Array();

  constructor() { }
}
