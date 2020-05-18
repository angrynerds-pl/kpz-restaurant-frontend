import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-history-main',
  templateUrl: './history-main.component.html',
  styleUrls: ['./history-main.component.scss']
})
export class HistoryMainComponent implements OnInit {

  orders: Order[];
  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
   // this.getTodaysOrders();
  }
  

  getTodaysOrders() {
    console.log("getting orders");
    this.orderService.getOrdersHistory(2020,parseInt('05'),18).subscribe(orders =>{
      this.orders = orders;
    });
    console.log(this.orders);
  }
  getOrders(year:number,month:number,day:number)
  {
    var date = (<HTMLInputElement>document.getElementById("dateInput")).value;
    var splittedDate = date.split("-",3);  
    this.orderService.getOrdersHistory(parseInt(splittedDate[0]),parseInt(splittedDate[1]),parseInt(splittedDate[2])).subscribe(orders =>
      {
        this.orders = orders;
      })
  }
}
