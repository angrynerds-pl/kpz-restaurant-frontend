import { ProductsInOrder } from './products-in-order';
import { Table } from './table';

export interface Order {
    id: number;
    tableId: number;
    table: Table;
    waiterId: number;
    orderDate: Date;
    status: boolean; 
    orderedProducts: Array<ProductsInOrder>;  
    note: string;
}