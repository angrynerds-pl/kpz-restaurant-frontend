import { Component, OnInit, Input } from '@angular/core';
import { ProductsInOrder } from 'src/app/models/products-in-order';

@Component({
  selector: 'app-history-order-products',
  templateUrl: './history-order-products.component.html',
  styleUrls: ['./history-order-products.component.scss']
})
export class HistoryOrderProductsComponent implements OnInit {

  @Input() productInOrder:ProductsInOrder;
  constructor() { }

  ngOnInit(): void {
  }

}
