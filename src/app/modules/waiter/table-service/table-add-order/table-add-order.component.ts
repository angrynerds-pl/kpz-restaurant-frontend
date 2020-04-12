import { Component, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { CategoryService } from 'src/app/services/category.service';
import { MenuCategory } from 'src/app/models/menu-category';
import { MenuProduct } from 'src/app/models/menu-product';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-table-add-order',
  templateUrl: './table-add-order.component.html',
  styleUrls: ['./table-add-order.component.scss']
})
export class TableAddOrderComponent implements OnInit {

  categories:MenuCategory[];
  products: MenuProduct[];
  choosenCategoryId:number;
  constructor(private categoriesService:CategoryService, private pruductsService:ProductService) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }
  loadCategories(){
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadProducts(){
    this.pruductsService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  showCategory(id,icon){
    console.log(icon)
    this.choosenCategoryId = id;
  }
  showProducts(){

  }
}
