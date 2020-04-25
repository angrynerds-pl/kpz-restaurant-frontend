import { Component, OnInit, Input, Output, OnDestroy } from "@angular/core";
import { faPlusCircle, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { ProductsToOrderService } from "src/app/services/products-to-order.service";
import { ProductToAdd } from "src/app/models/product-to-add";
import { EventEmitter } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ProductsInOrderService } from 'src/app/services/products-in-order.service';
import { ProductInOrder } from 'src/app/models/product-in-order';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-order-summary",
  templateUrl: "./order-summary.component.html",
  styleUrls: ["./order-summary.component.scss"],
})
export class OrderSummaryComponent implements OnInit, OnDestroy{

  iconPlusCircle = faPlusCircle;
  iconMinusCircle = faMinus;
  iconPlus = faPlus;
  
  orderID:number;

  @Input() productsToAdd: ProductToAdd[];
  @Input() tableID:number;
  @Output() close: EventEmitter<any> = new EventEmitter();

  @Input() orderEdit:ProductInOrder[]
  
  notes:string = '';
  productsToOrderSubscription:Subscription;

  constructor(private orderService:OrderService,  private productsToOrderService: ProductsToOrderService, private productsInOrderService: ProductsInOrderService) {}
  ngOnDestroy(): void {
    if(this.orderEdit){
     
      this.productsToOrderSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {

    if(this.orderEdit){
      this.productsToOrderService.editProdroductsFromOrder(this.orderEdit);
      this.orderID = this.orderEdit[0].orderID;
      let order = this.orderService.getOrderByID(this.orderID);
      this.notes = order.notes;
      this.productsToOrderSubscription = this.productsToOrderService.getProducts().subscribe(data => this.productsToAdd = data);
     
    }
  }


  

  changeAmountOfProduct(amount, product) {
    product.amount += amount;
    if (product.amount == 0) {
      this.productsToOrderService.removeProduct(product.product);
    }

    
  }

  manageOrder(){

    

    //new order
    if(!this.orderEdit){

    this.orderService.createOrder(this.tableID,this.notes);
    this.orderID = this.orderService.getOrderIDByTableID(this.tableID);
    this.productsInOrderService.addProductsToOrder(this.orderID, this.productsToAdd);
    
  }
    //editing order
    else{
      
      this.orderService.editOrder(this.orderID,this.notes);
      this.productsInOrderService.editProductsInOrder(this.orderID, this.productsToAdd);

    }
    this.close.emit();
  }
}
