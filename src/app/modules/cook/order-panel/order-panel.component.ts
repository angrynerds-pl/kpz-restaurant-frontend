import { Component, OnInit } from '@angular/core';
import { MenuProduct } from 'src/app/models/menu-product';
import { ProductService } from 'src/app/services/product.service';
import { OrderService } from 'src/app/services/order.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-order-panel',
  templateUrl: './order-panel.component.html',
  styleUrls: ['./order-panel.component.scss']
})
export class OrderPanelComponent implements OnInit {

  isReady: boolean =false;
  products:MenuProduct[];
  color: any;
  value: any;
  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.orderService.getProducts().subscribe(products =>{
      this.products = products;
    })
  }
  changeColor(){
    this.isReady ? this.isReady=false : this.isReady=true;
  }
    
  
}
