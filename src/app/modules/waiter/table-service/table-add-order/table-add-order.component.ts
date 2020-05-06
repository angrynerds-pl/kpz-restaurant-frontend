import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output,
  Inject
} from "@angular/core";
import { CategoryService } from "src/app/services/category.service";
import { MenuCategory } from "src/app/models/menu-category";
import { MenuProduct } from "src/app/models/menu-product";
import { ProductService } from "src/app/services/product.service";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ProductsToOrderService } from "src/app/services/products-to-order.service";
import { ProductToAdd } from "src/app/models/product-to-add";
import { Subscription } from "rxjs";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { ProductInOrder } from 'src/app/models/product-in-order';
import {MatSelect} from "@angular/material/select";
@Component({
  selector: "app-table-add-order",
  templateUrl: "./table-add-order.component.html",
  styleUrls: ["./table-add-order.component.scss"],
})
export class TableAddOrderComponent implements OnInit, OnDestroy {
  categories: Array<MenuCategory>  = [];
  products: MenuProduct[];
  productsToAdd: ProductToAdd[];
  choosenCategoryId: number;
  currentCategory:MenuCategory;
  counterBadge: number = 0;
  iconPlusCircle = faPlus;

  productsSubscription: Subscription;
  categoriesSubscription: Subscription;
  productsToAddSubscription: Subscription;

  tableID:number;

  pageNumber:number = 1;

  

  orderEdit:ProductInOrder[];
  @Output() pageChange: EventEmitter<number>;

  @Output() closeBootomSheet: EventEmitter<any> = new EventEmitter();

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private categoriesService: CategoryService,
    private pruductsService: ProductService,
    private productsToOrderService: ProductsToOrderService,
    private bottomSheetRef: MatBottomSheetRef
  ) {}

  ngOnInit(): void {
    //this.productsToAdd = [];
    
    this.loadCategories();
    this.loadProducts();

    this.tableID = this.data.id;
    if(this.data.productsInOrder){
        this.orderEdit = this.data.productsInOrder;
    }

    this.productsToAddSubscription = this.productsToOrderService
      .getProducts()
      .subscribe((products) => (this.productsToAdd = products));
  }
  ngOnDestroy(): void {
    this.productsToOrderService.resetProducts();
    this.categoriesSubscription.unsubscribe();
    this.productsSubscription.unsubscribe();
    this.productsToAddSubscription.unsubscribe();
  }

  loadCategories() {
    this.categoriesSubscription = this.categoriesService
      .getCategories()
      .subscribe((categories) => {
        this.categories = categories;
        this.currentCategory = this.categories[0];
        console.log('current',this.currentCategory);
      });
     
     
  }

  loadProducts() {
    this.productsSubscription = this.pruductsService
      .getProducts()
      .subscribe((products) => {
        this.products = products;
      });
  }

  setCategory(category){
    this.currentCategory = category;
  }
  
  addToSummaryProducts(product, amount) {
    this.productsToOrderService.addProduct(product, amount);
    this.counterBadge++;
  }

  closeBottomSheet(event) {
    
    this.bottomSheetRef.dismiss();
  }
}
