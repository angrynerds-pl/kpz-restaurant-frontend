import { ProductsInOrder } from './products-in-order';

export interface Order {
    id: number;
    tableId: number;
    date: string;
    status: boolean; 
    productsInOrder: Array<ProductsInOrder>;  
}
