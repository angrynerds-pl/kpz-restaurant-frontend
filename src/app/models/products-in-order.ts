import { MenuProduct } from './menu-product';

export interface ProductsInOrder {
    id:number;
    orderId:number;
    product:MenuProduct;
    status:number;
}