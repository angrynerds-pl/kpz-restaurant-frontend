/*export interface MenuCategory { //jak bedzie api
    id:number,
    name:string,
    icon:File

}*/

export class MenuCategory {
  
  constructor(
    public id: number,
    public name: string, 
    public file: string
    ) {
     
    }
}
