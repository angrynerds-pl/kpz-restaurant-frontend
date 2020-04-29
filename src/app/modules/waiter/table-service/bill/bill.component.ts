import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductsToOrderService } from 'src/app/services/products-to-order.service';
import { ProductInOrder } from 'src/app/models/product-in-order';
import { MenuProduct } from 'src/app/models/menu-product';
import { Subscription } from 'rxjs';
import {MatCheckbox} from '@angular/material/checkbox';
@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit,OnDestroy {

  products:MenuProduct[];
  productsInOrder:ProductInOrder[];
  billAmount:Array<number>;
  billNumber:number =1;

  totalAmount :number  =0 ;

  checkAll:boolean = true;
  disableAll:boolean = true;
  productsSubscription:Subscription;
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private categoriesService: CategoryService,
    private pruductsService: ProductService,
    private productsToOrderService: ProductsToOrderService,
    private bottomSheetRef: MatBottomSheetRef
  ) {}
  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.productsInOrder = this.data.productsInOrder;
    this.productsSubscription = this.pruductsService.getProducts().subscribe(products => this.products = products);
    this.sumUpTotalAmount();
    
  }

  sumUpTotalAmount(){
    this.productsInOrder.forEach(product =>{
      this.totalAmount+=this.products[product.productID].price;
    })
  }
  splitTheBill(){
    this.checkAll = false;
    //this.disableAll = false;
  }
}
