import { Component, OnInit, Input, Output, OnDestroy } from "@angular/core";
import { faPlusCircle, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { ProductsToOrderService } from "src/app/services/products-to-order.service";
import { ProductToAdd } from "src/app/models/product-to-add";
import { EventEmitter } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ProductsInOrderService } from 'src/app/services/products-in-order.service';
import { Subscription } from 'rxjs';
import { ProductsInOrder } from 'src/app/models/products-in-order';

@Component({
  selector: "app-order-summary",
  templateUrl: "./order-summary.component.html",
  styleUrls: ["./order-summary.component.scss"],
})
export class OrderSummaryComponent implements OnInit, OnDestroy{

  iconPlusCircle = faPlusCircle;
  iconMinusCircle = faMinus;
  iconPlus = faPlus;
  
  
  
  @Input() productsToAdd: ProductToAdd[];
  @Input() tableId:number;
  @Input() orderEdit:ProductsInOrder[]
  @Output() close: EventEmitter<any> = new EventEmitter();

  
  orderId:number;
  note:string = '';

  productsToOrderSubscription:Subscription;
  ordersSubscription:Subscription;

  constructor(private orderService:OrderService,  private productsToOrderService: ProductsToOrderService, private productsInOrderService: ProductsInOrderService) {}
  ngOnDestroy(): void {
    if(this.orderEdit){
     
      this.productsToOrderSubscription.unsubscribe();
      this.ordersSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {

    if(this.orderEdit){
      this.productsToOrderService.editProdroductsFromOrder(this.orderEdit);
      this.orderId = this.orderEdit[0].orderId;
      
      this.ordersSubscription = this.orderService.getOrderById(this.orderId).subscribe((data)=>{
        this.orderId=data.id;
        this.note = data.note;
      });
      
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
     
      // table, waiterId,orderedProducts,note
    this.orderService.createOrder(this.tableId,0,this.productsToAdd,this.note);
    this.orderService.addProductsToOrder( this.productsToAdd);
    
  }
    //editing order
    else{
      
     this.orderService.editOrder(this.orderId, this.productsToAdd, this.note);

    }
    this.close.emit();
  }
}
