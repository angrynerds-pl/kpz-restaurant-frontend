import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { OrderPanelComponent } from '../order-panel/order-panel.component';

@Component({
  selector: 'app-order-comment',
  templateUrl: './order-comment.component.html',
  styleUrls: ['./order-comment.component.scss']
})
export class OrderCommentComponent implements OnInit {

  @Input() order: Order;
  isCommentShown = false;
  isCommentNotNull=false;
  constructor(private service:OrderService) { }

  ngOnInit(): void {
    this.checkIfCommentNull();
  }

  toggle() {
    this.isCommentShown = !this.isCommentShown;
  }
  checkIfCommentNull() {   
    if (this.order.note !="" && this.order.note!=null)
    this.isCommentNotNull =true;
  }
}
