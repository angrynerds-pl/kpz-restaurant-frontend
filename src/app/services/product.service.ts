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
    
    
   }

  addProduct(product: MenuProduct, categoryName: string):Observable<MenuProduct>{
    return this.http.post<MenuProduct>(this.host + 'api/menu/' + categoryName , product, {
      headers : new HttpHeaders().set('Authorization', 'Bearer '+ this.storageService.getToken()),
     }); 
  }


  getProducts():Observable<Array<MenuProduct>>{
    return this.http.get<Array<MenuProduct>>(this.host + 'api/menu',{
      headers : new HttpHeaders().set('Authorization', 'Bearer '+ this.storageService.getToken()),
     });  

  }
  

}
