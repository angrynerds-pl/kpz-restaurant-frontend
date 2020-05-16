import { Component, OnInit, Input, Directive, Output, EventEmitter } from '@angular/core';
import { MenuProduct } from 'src/app/models/menu-product';
import { OrderService } from 'src/app/services/order.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { OrderPanelComponent } from '../order-panel/order-panel.component';
import { ProductInOrder } from 'src/app/models/product-in-order';
import { ProductsInOrder } from 'src/app/models/products-in-order';
import { Observable } from 'rxjs';



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
  cancel: boolean = false;

 
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
    {this.orderedProduct.status="READY" 
    this.service.updateStatus(this.orderedProduct).subscribe(); }

  }
}
