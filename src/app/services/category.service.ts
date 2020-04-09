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
      {id:0,name: "Pizzas",icon: "pizza.jpg"},
      {id:1,name: "Drinks",icon: "drink.jpg"},
      
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
