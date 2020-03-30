// export interface MenuProduct { //jak bedzie api odkomentowac
//     id:number;
//     name:string;
//     price:number;
//     categoryId: number;
// }

export class MenuProduct {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public categoryId: number
  ) {}
}
