import { Component, OnInit, Input, Output, OnDestroy } from "@angular/core";
import {
  faPlusCircle,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { ProductsToOrderService } from "src/app/services/products-to-order.service";
import { ProductToAdd } from "src/app/models/product-to-add";
import { EventEmitter } from "@angular/core";
import { OrderService } from "src/app/services/order.service";
import { ProductsInOrderService } from "src/app/services/products-in-order.service";
import { Subscription } from "rxjs";
import { ProductsInOrder } from "src/app/models/products-in-order";
import { Order } from "src/app/models/order";
import { TableService } from "src/app/services/table.service";

@Component({
  selector: "app-order-summary",
  templateUrl: "./order-summary.component.html",
  styleUrls: ["./order-summary.component.scss"],
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  iconPlusCircle = faPlusCircle;
  iconMinusCircle = faMinus;
  iconPlus = faPlus;

  @Input() productsToAdd: ProductToAdd[];
  @Input() tableId: number;
  @Input() orderEdit: Order;
  @Output() close: EventEmitter<any> = new EventEmitter();

  orderId: number;
  note: string = "";
  addedOrder: Order;
  productToEdit:ProductsInOrder;
  productsToOrderSubscription: Subscription;
  orderSubscription: Subscription;

  constructor(
    private orderService: OrderService,
    private productsToOrderService: ProductsToOrderService,
    private tableService: TableService
  ) {}
  ngOnDestroy(): void {
    if (this.orderEdit) {
      this.productsToOrderSubscription.unsubscribe();
      
    }
    
  }

  ngOnInit(): void {
    if (this.orderEdit) {
      this.orderId = this.orderEdit.id;
      this.note = this.orderEdit.note;
      this.productsToOrderSubscription = this.productsToOrderService
        .getProducts()
        .subscribe((data) => (this.productsToAdd = data));
    }
  }

  changeAmountOfProduct(amount, product:ProductToAdd) {
    product.amount += amount;
    if (product.amount == 0) {
      this.productsToOrderService.removeProduct(product.product);
    }
    
  }

  manageOrder() {
    //new order
    if (!this.orderEdit) {
      // id of user get from locale storage
      this.orderSubscription = this.orderService
        .createOrder(this.tableId, 1, this.productsToAdd, this.note)
        .subscribe((newOrder) => {
          this.addedOrder = newOrder;
          this.orderService
            .addProductsToOrder(this.addedOrder.id, this.productsToAdd)
            .subscribe();
        });

      this.tableService.changeStatusOfTable(this.tableId);
      ///this.orderSubscription.unsubscribe();
    }
    //editing order
    else {
      this.orderEdit.note = this.note;
      
      this.orderSubscription = this.orderService
        .editOrder(this.orderEdit)
        .subscribe((editedOrder) => {
         // console.log('editedOrder',this.orderEdit)
         this.orderService
            .editOrderProducts(this.orderEdit, this.productsToAdd).subscribe(order=> console.log(order));
        });
      //this.orderSubscription.unsubscribe();
    }
    this.close.emit();
  }
}
