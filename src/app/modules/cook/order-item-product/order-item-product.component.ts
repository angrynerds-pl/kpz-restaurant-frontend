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

  @Input() product:MenuProduct;
  @Input() id:number;
  @Input() status:number;
  constructor(private service:OrderService) { 
    
  }

  ngOnInit(): void {

  }
  getClass(){
    if (this.status==1)
    {
      return 'componentDiv';
    }
    else if (this.status == 2)
    {
      return 'componentReady';
    }
    else return 'componentPicked';
  }
  changeStatus(){
   // console.log(this.status);
    return this.status==1 ? this.status=2 : this.status=1;
  }


}
