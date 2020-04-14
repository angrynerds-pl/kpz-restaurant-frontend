import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { CategoryService } from 'src/app/services/category.service';
import { MenuCategory } from 'src/app/models/menu-category';
import { MenuProduct } from 'src/app/models/menu-product';
import { ProductService } from 'src/app/services/product.service';
import { faPlusCircle} from  "@fortawesome/free-solid-svg-icons";
import {Observable} from 'rxjs';
import { ProductsToOrderService } from 'src/app/services/products-to-order.service';
import { ProductsToAdd } from 'src/app/models/products-to-add';
@Component({
  selector: 'app-table-add-order',
  templateUrl: './table-add-order.component.html',
  styleUrls: ['./table-add-order.component.scss']
})
export class TableAddOrderComponent implements OnInit, OnDestroy {

  //@Output() productsUpdate: EventEmitter<any> = new EventEmitter();

  categories:MenuCategory[];
  products: MenuProduct[];
  productsToAdd:ProductsToAdd[];
  choosenCategoryId:number;
  iconPlusCircle =  faPlusCircle;
  constructor(private categoriesService:CategoryService, private pruductsService:ProductService, private productsToOrderService:ProductsToOrderService) { }
  ngOnDestroy(): void {
    this.productsToOrderService.resetProducts();
  }

  ngOnInit(): void {
    this.productsToAdd = [];
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
    
    this.choosenCategoryId = id;
  }
  
  updateProductsToAdd(){
    
    this.productsToOrderService.getProducts().subscribe(products=>
      this.productsToAdd = products);
    
  }
  addToSummaryProducts(product, amount){
    
    //let productIndex = this.pruductsService.findProduct(id);
    this.productsToOrderService.addProduct(product,amount);
    
  }
}
