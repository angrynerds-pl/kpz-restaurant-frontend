import { Component, OnInit, Input, Output } from "@angular/core";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { ProductsToOrderService } from "src/app/services/products-to-order.service";
import { ProductToAdd } from "src/app/models/product-to-add";
import { EventEmitter } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: "app-order-summary",
  templateUrl: "./order-summary.component.html",
  styleUrls: ["./order-summary.component.scss"],
})
export class OrderSummaryComponent implements OnInit {

  iconPlusCircle = faPlusCircle;
  iconMinusCircle = faMinusCircle;
  
  @Input() productsToAdd: ProductToAdd[];
  @Input() tableID:number;
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(private orderService:OrderService,  private productsToOrderService: ProductsToOrderService) {}

  ngOnInit(): void {}

  changeAmountOfProduct(amount, product) {
    product.amount += amount;
    if (product.amount == 0) {
      this.productsToOrderService.removeProduct(product.product);
    }
  }

  createOrder(){
    console.log(this.productsToAdd);
    this.orderService.createOrder(this.tableID);
    
    
    this.close.emit();
  }
}
