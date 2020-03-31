// export interface User { //jak bedzie api odkomentowac
//       id:number;
//  username: string;
//   password: string;
//    firstName: string;
//    lastName: string;
// }

export class User {
  constructor(
    public id: number,
    public username: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public position:string
  ) {}
}
