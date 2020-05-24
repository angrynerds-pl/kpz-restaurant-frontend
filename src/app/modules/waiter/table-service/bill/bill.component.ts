import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { MAT_BOTTOM_SHEET_DATA } from "@angular/material/bottom-sheet";
import { ProductsInOrder } from "src/app/models/products-in-order";
import { MenuProduct } from "src/app/models/menu-product";
import { Subscription } from "rxjs";
import { FormControl } from "@angular/forms";
import { OrderService } from "src/app/services/order.service";
@Component({
  selector: "app-bill",
  templateUrl: "./bill.component.html",
  styleUrls: ["./bill.component.scss"],
})
export class BillComponent implements OnInit, OnDestroy {
  
  products: MenuProduct[];
  productsInOrder: ProductsInOrder[];
  billAmount: Array<number>;
  billNumber: number = 1;

  totalAmount: number = 0;

  checkStatus: boolean[];

  closeBottomSheet = true;

  productsInOrderSubscription: Subscription;
  orderItemPrice = new FormControl();
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private orderService: OrderService,
    private bottomSheetRef: MatBottomSheetRef
  ) {}
  
  ngOnDestroy(): void {}
  
  ngOnInit(): void {
    this.productsInOrder = new Array();
    this.data.productsInOrder.forEach((product) => {
      if (product.status == "SERVED") {
        console.log(product);
        this.productsInOrder.push(product);
      }
    });

    this.sumUpTotalAmount();
  }

  sumUpTotalAmount() {
    this.productsInOrder.forEach((product) => {
      this.totalAmount += product.product.price;
    });
    this.checkStatus = new Array(this.productsInOrder.length);
    this.checkStatus.fill(true);
  }
  
  splitTheBill() {
    console.log(this.checkStatus);
    this.checkStatus.fill(false);
    console.log(this.checkStatus);
    this.totalAmount = 0;
  }

  changeTotalAmount(event, price) {
    if (!event.checked) {
      this.checkStatus[event.source.id] = false;
      this.totalAmount -= price;
    } else {
      this.checkStatus[event.source.id] = true;
      this.totalAmount += price;
    }
  }
  
  billPayment() {
    this.totalAmount = 0;
    this.productsInOrder.forEach((product, index) => {
      if (this.checkStatus[index] == true) {
        product.status = "PAID";
        this.orderService.updateStatus(product).subscribe();
      } else {
        this.closeBottomSheet = false;
      }
    });
    if (this.closeBottomSheet) {
      this.bottomSheetRef.dismiss();
    }
    this.closeBottomSheet = true;
  }
}
