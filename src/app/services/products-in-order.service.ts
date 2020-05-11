import { Injectable } from "@angular/core";
import { ProductsInOrder } from "../models/products-in-order";
import { ProductToAdd } from '../models/product-to-add';
import { Observable } from "rxjs";
import { of as ObservableOf } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class ProductsInOrderService {
  
  productToAdd:ProductsInOrder = null;
  constructor() {
    
  }

  addProductsToOrder(orderID, productsToOrder:Array<ProductToAdd>) {
    let counterID = 1;
    productsToOrder.forEach(element => {
      
        for(let i=0;i<element.amount;i++){
          
          //this.productToAdd = {orderID:orderID,productID:element.product.id,productInOrderID:counterID,status:'In progress'};
         // this.productsInOrder.push(this.productToAdd);
          counterID++;
        }
    });
    //console.log(this.productsInOrder);
  }
  editProductsInOrder(orderID:number, productsToOrder:Array<ProductToAdd>){
   /*// let currentProducts = this.productsInOrder.filter((e) => e.orderID === orderID);
    let currentID = currentProducts.length +1;
    console.log(this.productsInOrder.filter((e) => e.orderID === orderID));
    console.log("from order",productsToOrder);
    productsToOrder.forEach(element => {
      let amountOfProductsInOrder = currentProducts.filter((e) => e.productID === element.product.id);
      if(amountOfProductsInOrder.length < element.amount){

          for(let i=amountOfProductsInOrder.length;i<element.amount;i++){
        
            this.productToAdd = {orderID:orderID,productID:element.product.id,productInOrderID:currentID,status:'In progress'};
            this.productsInOrder.push(this.productToAdd);
            currentID++;
          }
  }
    else if(amountOfProductsInOrder.length > element.amount){
      
      for(let i=element.amount;i<amountOfProductsInOrder.length;i++){
        console.log(amountOfProductsInOrder[0].productID);
        this.removeProductFromOrder(amountOfProductsInOrder[0].productID);
      }
    }
});
  console.log(this.productsInOrder.filter((e) => e.orderID === orderID));*/
  }
  

  removeProductFromOrder(id) {
    let productsIndex = this.findProductsInOrder(id); 

   // this.productsInOrder.splice(productsIndex, 1);
  }

  /*getProductsInOrder(orderID):Observable<ProductsInOrder[]>{

    
    return ObservableOf(this.productsInOrder.filter((e) => e.orderID === orderID));
    
  }*/
  updateProductsInOrder(user) {
    let userArrayIndex = this.findProductsInOrder(user.id);
   // this.productsInOrder[userArrayIndex] = user;
  }
  
  findProductsInOrder(id) {
   /* let index = this.productsInOrder.findIndex(
      (product) => product.productID === id
    );

    return index;*/
  }
  getLastProductsInOrderID() {
   /* if (this.productsInOrder.length != 0) {
      return (
        this.productsInOrder[this.productsInOrder.length - 1].productInOrderID +
        1
      );
    } else {
      return 0;
    }*/
  }
}
