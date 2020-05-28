export interface Reservation {
    id: number;
    tableId: number;
    numberOfSeats: number;
    customerName: string;
    startDate: Date;
    endDate: Date;
    note:string
}