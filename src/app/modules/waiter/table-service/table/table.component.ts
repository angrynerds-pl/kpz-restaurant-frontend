import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Table } from "src/app/models/table";
import { TableService } from "src/app/services/table.service";
import { Subscription } from "rxjs";
import {
  MatBottomSheet
} from "@angular/material/bottom-sheet";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";
import { TableAddOrderComponent } from "../table-add-order/table-add-order.component";
import { BillComponent } from "../bill/bill.component";
import { OrderService } from "src/app/services/order.service";
import { ProductsInOrder } from "src/app/models/products-in-order";
import { MenuProduct } from "src/app/models/menu-product";
import { Order } from "src/app/models/order";
import { ProductStatusPipe } from "../product-status-pipe";
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
  orderSubscription: Subscription;
  productsInOrderSubscription: Subscription;

  products: MenuProduct[];

  orders: Array<Order> = [];

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private tableService: TableService,
    private _bottomSheet: MatBottomSheet
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

    this.orderSubscription = this.orderService
      .getOrderByTableId(this.id)
      .subscribe((data) => {
        //this.orderDetails = data;
        this.orderDetails = data[0];
        console.log(this.orderDetails);
        if (this.orderDetails != null) {
          this.productsInOrder = this.orderDetails.orderedProducts;
        }
      });
  }

  getClassTable() {
    switch (this.table.status) {
      case "FREE":
        return "free";
      case "SERVE":
        return "serve";
      case "OCCUPIED":
        return "occupied";
    }
  }
  getClassProduct(status) {
    switch (status) {
      case "IN_PROGRESS":
        return "serve";
      case "READY":
        return "free";
      case "LATE":
        return "occupied";
      case "SERVED":
        return "served";
      case "PAID":
        return "served";
    }
  }
  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.tableSubscription.unsubscribe();
    this.orderSubscription.unsubscribe();
  }

  openBottomSheetOrder(): void {
    this._bottomSheet._openedBottomSheetRef = this._bottomSheet.open(
      TableAddOrderComponent,
      {
        data: { id: this.id, orderEdit: this.orderDetails },
        disableClose: false,
      }
    );
    this._bottomSheet._openedBottomSheetRef
      .afterDismissed()
      .subscribe((data) => {
        this.orderSubscription = this.orderService
          .getOrderByTableId(this.id)
          .subscribe((data) => {
            this.orderDetails = data[0];
            if (this.orderDetails) {
              this.productsInOrder = this.orderDetails.orderedProducts;
              this.tableSubscription = this.tableService
                .getTable(this.id)
                .subscribe((data) => {
                  this.table = data;
                });
            }
          });
      });
  }

  openBottomSheetBill(): void {
    if (this.productsInOrder.some((product) => product.status == "SERVED")) {
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

      this._bottomSheet._openedBottomSheetRef
        .afterDismissed()
        .subscribe((data) => {
          if (
            this.productsInOrder.every((product) => product.status == "PAID")
          ) {
            this.tableService.changeStatusOfTable(this.id);
            this.orderDetails.status = "PAID";
            this.productsInOrder = null;
            this.orderService
              .editOrder(this.orderDetails)
              .subscribe((editedOrder) => {
                this.tableSubscription = this.tableService
                  .getTable(this.id)
                  .subscribe((data) => {
                    console.log(this.table.status);
                    this.table = data;
                    console.log(this.table.status);
                  });
              });
            this.orderDetails = null;
          }
        });
    }
  }

  changeOfProductStatus(product: ProductsInOrder) {
    if (product.status == "READY") {
      product.status = "SERVED";
      this.orderService.updateStatus(product).subscribe((updatedProduct) => {
        if (
          this.productsInOrder.every((product) => product.status == "SERVED" || product.status == "PAID")
        ) {
          this.tableService.changeStatusOfTable(this.id);
          this.orderDetails.status = "SERVED";
          this.orderService
            .editOrder(this.orderDetails)
            .subscribe((editedOrder) => {
              this.tableSubscription = this.tableService
                .getTable(this.id)
                .subscribe((data) => {
                  console.log(this.table.status);
                  this.table = data;
                  console.log(this.table.status);
                });
            });
        }
      });
    }
  }
}
