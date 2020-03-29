import { Injectable } from '@angular/core';
import {MenuCategory} from '../models/menu-category';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  categories:Array<Observable<MenuCategory>> = new Array<Observable<MenuCategory>>();
  constructor() { }


  addCategory(category){
    this.categories.push(category);
  }

  getCategories(){
    return this.categories;
  }

  getLastCategoryID(){
    return this.categories.length;
  }
}
