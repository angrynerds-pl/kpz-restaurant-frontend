import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuProduct } from 'src/app/models/menu-product';
import { ProductsInOrder } from 'src/app/models/products-in-order';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';


@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {

  @Input() productInOrder:ProductsInOrder;
  @Input() order:Order;
  @Output() emitter = new EventEmitter<boolean>();
  constructor(private service:OrderService) {  }


  ngOnInit(): void {
  }
  onOrderCompleted(completed:boolean)
  {
    if (completed)
    {
      this.emitter.emit(completed);
    }
  }
}
