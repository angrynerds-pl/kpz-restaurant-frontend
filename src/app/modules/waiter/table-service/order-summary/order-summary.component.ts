import { Component, OnInit,Input } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { CategoryService } from 'src/app/services/category.service';
import { MenuCategory } from 'src/app/models/menu-category';
import { MenuProduct } from 'src/app/models/menu-product';
import { ProductService } from 'src/app/services/product.service';
import { faPlusCircle, faMinusCircle} from  "@fortawesome/free-solid-svg-icons";
import {Observable} from 'rxjs';
import { ProductsToOrderService } from 'src/app/services/products-to-order.service';
import { ProductsToAdd } from 'src/app/models/products-to-add';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  //prodcutsToAddOb:Observable<ProductsToAdd[]>;
  iconPlusCircle = faPlusCircle;
  iconMinusCircle = faMinusCircle;
  @Input() productsToAdd:ProductsToAdd[];
  constructor(private productsToOrderService:ProductsToOrderService) { }

  ngOnInit(): void {
    
  }

  changeAmountOfProduct(amount, product){
    
     
        product.amount +=amount;
        if(product.amount==0){
          this.productsToOrderService.removeProduct(product.product);
           
        
        }
    }
  

}
