import { Table } from './table';
import { ProductsInOrder } from './products-in-order';

export interface OrderWaiter { 
    id: number,
    restaurantId: number,
    tableId: number,
    table: Table,
    waiterId: number,
    orderDate: Date,
    orderedProducts: Array<ProductsInOrder>;
    notes:string
}

