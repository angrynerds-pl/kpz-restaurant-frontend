import { MenuProduct } from './menu-product';

export interface ProductsInOrder {
    id: number;
    orderId: number;
    productId: number;
    status: string;
    product : MenuProduct;
}
