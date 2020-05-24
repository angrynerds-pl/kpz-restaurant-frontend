import { Component, OnInit, Input, Directive, Output, EventEmitter } from '@angular/core';
import { MenuProduct } from 'src/app/models/menu-product';
import { OrderService } from 'src/app/services/order.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { OrderPanelComponent } from '../order-panel/order-panel.component';
import { ProductsInOrder } from 'src/app/models/products-in-order';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order';



@Component({
  selector: 'app-order-item-product',
  templateUrl: './order-item-product.component.html',
  styleUrls: ['./order-item-product.component.scss'],
})
export class OrderItemProductComponent implements OnInit {

  @Input() product: MenuProduct;
  @Input() id: number;
  @Input() status: string;
  @Input() orderedProduct: ProductsInOrder;
  @Input() order: Order;
  @Output() emitter = new EventEmitter<boolean>();
  cancel: boolean = false;
  completed: boolean =true;
 
  constructor(private service:OrderService) {    
 
    
  }

  ngOnInit(): void {
    this.getClass();
  }

  getClass(){
    if (this.orderedProduct.status=="IN_PROGRESS")
    {
      return 'componentDiv';
    }
    else if (this.orderedProduct.status == "READY")
    {
      return 'componentReady';
    }
    else return 'componentPicked';
  }
  setDelete(){
    this.cancel=true;    
  }
  cancelOrderReady()
  {
    this.orderedProduct.status="IN_PROGRESS"
    this.service.updateStatus(this.orderedProduct).subscribe();
    this.cancel = false;
  }
  changeStatus(){  
    if (this.orderedProduct.status=="IN_PROGRESS") 
    {
      console.log(this.id);
      this.orderedProduct.status="READY" 
      this.service.updateStatus(this.orderedProduct).subscribe(); 
      if(this.checkOrderCompleted()){
        this.order.status="served";     
        this.service.updateOrderStatus(this.order).subscribe(data =>this.emitter.emit(this.completed));    
        }
    }
  }
  checkOrderCompleted(){
    for ( var i=0; i<this.order.orderedProducts.length;i++){
      if (this.order.orderedProducts[i].status!=="READY"){
        return false;
      }
    }
    return true;
  }
}
