import { Component, OnInit, Input } from '@angular/core';
import { MenuProduct } from 'src/app/models/menu-product';
import { ProductService } from 'src/app/services/product.service';
import { OrderService } from 'src/app/services/order.service';
import { NgClass } from '@angular/common';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-order-panel',
  templateUrl: './order-panel.component.html',
  styleUrls: ['./order-panel.component.scss']
})
export class OrderPanelComponent implements OnInit {

  
  productId:number;
  comment: string;
  orders:Order[];
  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders () {
    this.orderService.getOrders().subscribe(orders =>{
      this.orders = orders;
      //sorting so the longest order is at the end 
     /* this.orders.sort((n1,n2) => {
        if (n1.productsInOrder.length > n2.productsInOrder.length)
        return 1;
        else return -1;
      });*/
    })
  }
  onOrderCompleted(completed:boolean){
    if(completed)
    {
      this.loadOrders();
    }
  }
 
}
