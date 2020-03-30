import { Injectable } from '@angular/core';
import {MenuCategory} from '../models/menu-category';
import {Observable} from 'rxjs';
import {of as ObservableOf} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories:MenuCategory[];
  constructor() {
    this.categories = [
      new MenuCategory(0,"Pizzas","pizza.jpg")
    ];
   }


  addCategory(category){
    this.categories.push(category);
  }

  getCategories():Observable<MenuCategory[]>{
    return ObservableOf(this.categories);
  }

  getLastCategoryID(){
    return this.categories.length;
    
  }
}
