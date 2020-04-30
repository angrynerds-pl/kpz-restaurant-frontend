import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductsToOrderService } from 'src/app/services/products-to-order.service';
import { ProductInOrder } from 'src/app/models/product-in-order';
@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

  productsInOrder:ProductInOrder[];
  billAmount:Array<number>;
  billNumber:number =1;
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private categoriesService: CategoryService,
    private pruductsService: ProductService,
    private productsToOrderService: ProductsToOrderService,
    private bottomSheetRef: MatBottomSheetRef
  ) {}
  ngOnInit(): void {
    this.productsInOrder = this.data.productsInOrder;
    this.loadBillAmount();
    
  }


  loadBillAmount(){
    this.billAmount = new Array(this.productsInOrder.length);
    for(let i=1;i<=this.billAmount.length;i++){
      this.billAmount[i-1] = i;
    }
  }

  createBills(numberOfBills){
    
  }
}
