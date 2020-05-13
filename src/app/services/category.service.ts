import { Injectable } from '@angular/core';
import {MenuCategory} from '../models/menu-category';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  host: string = environment.host;

  constructor(private http:HttpClient, private storageService:LocalStorageService) {}
    
  getCategories():Observable<Array<MenuCategory>>{
    return this.http.get<Array<MenuCategory>>(this.host + 'api/menu/categories',{
      headers : new HttpHeaders().set('Authorization', 'Bearer '+ this.storageService.getToken()),
     });  
  }

  addCategory(category: MenuCategory):Observable<MenuCategory>{
    return this.http.post<MenuCategory>(this.host + 'api/menu/categories', category, {
      headers : new HttpHeaders().set('Authorization', 'Bearer '+ this.storageService.getToken()),
     });  
  }

}
