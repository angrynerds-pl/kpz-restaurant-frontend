import { Injectable } from '@angular/core';
import {MenuProduct} from '../models/menu-product';
import {Observable} from 'rxjs';
import {of as ObservableOf} from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products:MenuProduct[];

  host: string = environment.host;
  constructor(private http:HttpClient, private storageService:LocalStorageService) {
    
    this.products = [
      {id:0,name: "Funghi",price: 20, categoryId: 0},
      {id:1,name: "CocaCola",price: 50, categoryId: 1},
      {id:2,name: "Fanta",price: 5, categoryId: 1},
      {id:3,name: "Margherita",price: 45, categoryId: 0},
      {id:4,name: "Sprite",price: 92, categoryId: 1},
      {id:5,name: "Salami",price: 20, categoryId: 0},
      {id:6,name: "Italiana",price: 20, categoryId: 0},
      {id:7,name: "Braziliana",price: 20, categoryId: 0},
      {id:8,name: "Hawaiian",price: 20, categoryId: 0},
      {id:9,name: "Spinace",price: 20, categoryId: 0},
      {id:10,name: "Diavolo",price: 20, categoryId: 0},

      ];
   }

  addProduct(product){
    this.products.push(product);
  }

  
   
  //getProducts():Observable<MenuProduct[]>{
  //  return ObservableOf(this.products);
  //}
  getProducts():Observable<Array<MenuProduct>>{
    return this.http.get<Array<MenuProduct>>(this.host+'api/menu',{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storageService.getToken()),
    });
    
  }
  //getCategoryProducts
  getLastProductID(){
    return this.products.length;
    
  }
  findProduct(id){
    
   let index = this.products.findIndex(product => product.id ===id);
    
      
      return index;
  }
  getProduct(id):MenuProduct{
    let index = this.findProduct(id);
    return this.products[index];
  }
}
