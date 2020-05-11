import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Table } from "src/app/models/table";
import { TableService } from "src/app/services/table.service";
import { Subscription, Observable } from "rxjs";
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from "@angular/material/bottom-sheet";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";
import { TableAddOrderComponent } from "../table-add-order/table-add-order.component";
import { BillComponent } from "../bill/bill.component";
import { OrderService } from "src/app/services/order.service";
import { ProductsInOrder } from "src/app/models/products-in-order";
import { ProductsInOrderService } from "src/app/services/products-in-order.service";
import { ProductService } from "src/app/services/product.service";
import { MenuProduct } from "src/app/models/menu-product";
import { Order } from 'src/app/models/order';
@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnInit, OnDestroy {
  id: number;
  table: Table = {} as Table;

  buttonBack = faTimes;
  iconPlusCircle = faPlusCircle;
  iconBill = faFileInvoiceDollar;
  iconEdit = faEdit;

  orderDetails: Order;
  productsInOrder: ProductsInOrder[];

  routeSubscription: Subscription;
  tableSubscription: Subscription;
  ordersSubscription: Subscription;
  productsInOrderSubscription: Subscription;
  productsSubscription: Subscription;

  products: MenuProduct[];
  orders:Array<Order>=[];
  constructor(
    private ordersService: OrderService,
    private route: ActivatedRoute,
    private tableService: TableService,
    private _bottomSheet: MatBottomSheet,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((data) => {
      this.id = data.id;
    });
    this.tableSubscription = this.tableService
      .getTable(this.id)
      .subscribe((data) => {
        this.table = data;
      });
      /*this.orderSubscription = this.orderService
      .getOrders()
      .subscribe((data) => {
        
      this.orders = data;
      console.log(this.orders);
    });*/
      
    this.ordersSubscription = this.ordersService
      .getOrderByTableId(this.id)
      .subscribe((data) => (this.orderDetails = data));
    if (this.orderDetails) {
      
      this.productsInOrder = this.orderDetails.orderedProducts;
       
      this.productsSubscription = this.productService
        .getProducts()
        .subscribe((data) => {
          this.products = data;
        });
    }
    
  }

  getClassTable() {
    switch (this.table.status) {
      case 'FREE':
        return 'free';
      case 'SERVE':
        return 'serve';
      case 'OCCUPIED':
        return 'occupied';
    }
  }
  getClassProduct(status) {
    switch (status) {
      case "In progress":
        return "serve";
      case "Ready":
        return "free";
      case "Late":
        return "occupied";
      case "Served":
        return "served";
    }
  }
  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.tableSubscription.unsubscribe();
    this.ordersSubscription.unsubscribe();
    if (this.orderDetails) {
      
      this.productsSubscription.unsubscribe();
    }
  }

  openBottomSheetOrder(): void {
    this._bottomSheet._openedBottomSheetRef = this._bottomSheet.open(
      TableAddOrderComponent,
      {
        data: { id: this.id, productsInOrder: this.productsInOrder },
        disableClose: false,
      }
    );
    this._bottomSheet._openedBottomSheetRef
      .afterDismissed()
      .subscribe((data) => {
        this.ordersSubscription.unsubscribe();
        this.ordersSubscription = this.ordersService
          .getOrderByTableId(this.id)
          .subscribe((data) => (this.orderDetails = data));
        
        if (this.orderDetails) {
         
          //subscription
         
          /*this.ordersSubscription = this.productsInOrderService
            .getProductsInOrder(this.orderDetails.id)
            .subscribe((data) => {
              this.productsInOrder = data;
            });
          this.productsSubscription = this.productService
            .getProducts()
            .subscribe((data) => {
              this.products = data;
              console.log(this.products[0].name);
            });*/
        }
      });

    
  }
  openBottomSheetBill(): void {

    if (this.productsInOrder.some((product) => product.status == "Served")) {
      this._bottomSheet._openedBottomSheetRef = this._bottomSheet.open(
        BillComponent,
        {
          data: {
            orderDetails: this.orderDetails,
            productsInOrder: this.productsInOrder,
          },
          disableClose: false,
        }
      );
    }

  }
}
