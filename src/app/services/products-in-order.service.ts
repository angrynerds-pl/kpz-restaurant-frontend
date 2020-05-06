import { Injectable } from "@angular/core";
import { ProductInOrder } from "../models/product-in-order";
import { ProductToAdd } from '../models/product-to-add';
import { Observable } from "rxjs";
import { of as ObservableOf } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class ProductsInOrderService {
  productsInOrder: Array<ProductInOrder>;
  productToAdd:ProductInOrder = null;
  constructor() {
    this.productsInOrder=[{orderID:0,productInOrderID:0,productID:0, status:"In progress"},
    {orderID:0,productInOrderID:1,productID:0, status:"In progress"},{orderID:0,productInOrderID:2,productID:4, status:"Ready"},
    {orderID:0,productInOrderID:3,productID:4, status:"Ready"},{orderID:0,productInOrderID:4,productID:3, status:"Late"},
    {orderID:1,productInOrderID:0,productID:4, status:"Ready"},{orderID:1,productInOrderID:1,productID:3, status:"Served"},{orderID:1,productInOrderID:2,productID:2, status:"Served"},]
  }

  addProductsToOrder(orderID, productsToOrder:Array<ProductToAdd>) {
    let counterID = 1;
    productsToOrder.forEach(element => {
      
        for(let i=0;i<element.amount;i++){
          
          this.productToAdd = {orderID:orderID,productID:element.product.id,productInOrderID:counterID,status:'In progress'};
          this.productsInOrder.push(this.productToAdd);
          counterID++;
        }
    });
    console.log(this.productsInOrder);
  }
  editProductsInOrder(orderID:number, productsToOrder:Array<ProductToAdd>){
    let currentProducts = this.productsInOrder.filter((e) => e.orderID === orderID);
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
  console.log(this.productsInOrder.filter((e) => e.orderID === orderID));
  }
  

  removeProductFromOrder(id) {
    let productsIndex = this.findProductsInOrder(id); 

    this.productsInOrder.splice(productsIndex, 1);
  }

  getProductsInOrder(orderID):Observable<ProductInOrder[]>{

    
    return ObservableOf(this.productsInOrder.filter((e) => e.orderID === orderID));
    
  }
  updateProductsInOrder(user) {
    let userArrayIndex = this.findProductsInOrder(user.id);
    this.productsInOrder[userArrayIndex] = user;
  }
  
  findProductsInOrder(id) {
    let index = this.productsInOrder.findIndex(
      (product) => product.productID === id
    );

    return index;
  }
  getLastProductsInOrderID() {
    if (this.productsInOrder.length != 0) {
      return (
        this.productsInOrder[this.productsInOrder.length - 1].productInOrderID +
        1
      );
    } else {
      return 0;
    }
  }
}
