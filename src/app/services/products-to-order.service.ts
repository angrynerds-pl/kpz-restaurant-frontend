import { Injectable } from "@angular/core";
import { MenuProduct } from "../models/menu-product";
import { Observable } from "rxjs";
import { of as ObservableOf } from "rxjs";
import { ProductToAdd } from "../models/product-to-add";
import { ProductService } from './product.service';
@Injectable({
  providedIn: "root",
})
export class ProductsToOrderService {
  productsToAdd: ProductToAdd[];
  productToAdd:ProductToAdd;
  constructor(private productService:ProductService) {
    this.productsToAdd = [];
  }

  addProduct(product, amount: number) {
    let index = this.findProduct(product);
    console.log(index);
    if (index == -1) {
      this.productsToAdd.push({
        product: product,
        amount: amount,
      });
    } else {
      this.updateAmountOfProduct(index, amount);
    }
  }
  updateAmountOfProduct(index, amount) {
    this.productsToAdd[index].amount += amount;
  }
  findProduct(product) {
    let index = this.productsToAdd.findIndex(
      (productToAdd) => productToAdd.product.id === product.id
    );

    return index;
  }

  removeProduct(product) {
    let productsIndex = this.findProduct(product);

    this.productsToAdd.splice(productsIndex, 1);
  }

  getProducts(): Observable<ProductToAdd[]> {
    return ObservableOf(this.productsToAdd);
  }
  resetProducts() {
    this.productsToAdd = [];
  }


  editProdroductsFromOrder(productInOrder){
    productInOrder.forEach(element => {
      this.addProduct(this.productService.getProduct(element.productID),1);
    });
  }

  editOrder(){
    
  }
}
