import { Component, OnInit, Input } from '@angular/core';
import { MenuProduct } from 'src/app/models/menu-product';
import { OrderService } from 'src/app/services/order.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-order-item-product',
  templateUrl: './order-item-product.component.html',
  styleUrls: ['./order-item-product.component.scss']
})
export class OrderItemProductComponent implements OnInit {

  @Input() product: MenuProduct;
  @Input() id: number;
  @Input() status: string;
  constructor(private service:OrderService) { 
    
  }

  ngOnInit(): void {
    console.log("product" +this.product);

  }
  getClass(){
    if (this.status=="IN_PROGRESS")
    {
      return 'componentDiv';
    }
    else if (this.status == "READY")
    {
      return 'componentReady';
    }
    else return 'componentPicked';
  }
  changeStatus(){
    return this.status=="IN_PROGRESS" ? this.status="READY" : this.status="IN_PROGRESS";
  }


}
