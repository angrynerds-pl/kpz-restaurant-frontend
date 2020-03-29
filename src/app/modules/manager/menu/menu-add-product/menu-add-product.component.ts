import { Component, OnInit } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-menu-add-product',
  templateUrl: './menu-add-product.component.html',
  styleUrls: ['./menu-add-product.component.scss']
})
export class MenuAddProductComponent implements OnInit {

  acceptIcon=faCheck;
  cancelIcon=faTimes;

  constructor() { }

  ngOnInit(): void {
  }

}
