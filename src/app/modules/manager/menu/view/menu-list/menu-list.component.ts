import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { MenuProduct } from 'src/app/models/menu-product';
import { MenuCategory } from 'src/app/models/menu-category';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  categories:MenuCategory[];
  products:MenuProduct[];
  selectedCategoryId:number;

  constructor(private productService:ProductService, private categoryService:CategoryService) { 

  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }
  loadProducts()
  {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    })
  }
    loadCategories()
  {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
}
