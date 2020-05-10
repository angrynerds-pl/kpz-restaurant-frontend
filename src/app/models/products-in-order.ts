import { MenuProduct } from './menu-product';

export interface ProductsInOrder {
    id: number;
    orderId: number;
    productId: number;   
    product : MenuProduct;
    status: string;
}
