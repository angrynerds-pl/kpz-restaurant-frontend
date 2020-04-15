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
      {id:0,name: "Pizzas",icon: "pizza.png"},
      {id:1,name: "Drinks",icon: "drink.jpg"},
      {id:2,name: "Starters",icon: "starter.jpg"},
      {id:3,name: "Noodles",icon: "starter.jpg"},
      
      {id:4,name: "Chinese",icon: "starter.jpg"},
      
      {id:5,name: "Fishes",icon: "starter.jpg"},
      {id:6,name: "Burgers",icon: "starter.jpg"},
      {id:7,name: "Burgers",icon: "starter.jpg"},
      {id:8,name: "Burgers",icon: "starter.jpg"},
      {id:9,name: "Burgers",icon: "starter.jpg"},
      {id:10,name: "Burgers",icon: "starter.jpg"},
      {id:11,name: "Buargers",icon: "starter.jpg"},
      {id:12,name: "d",icon: "starter.jpg"},
      

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