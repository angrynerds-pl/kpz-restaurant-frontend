import { Component, OnInit, Input } from '@angular/core';
import { MenuProduct } from 'src/app/models/menu-product';
import { ProductsInOrder } from 'src/app/models/products-in-order';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {

  @Input() productInOrder:ProductsInOrder;
  constructor() {  }

  ngOnInit(): void {
    console.log("productinorder "+this.productInOrder);
  }

  
}
