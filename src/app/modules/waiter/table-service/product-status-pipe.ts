import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'status'})
export class ProductStatusPipe implements PipeTransform {
  transform(val: string): any {
    
    switch(val){
        case 'IN_PROGRESS':
            return 'In progress';
        break;
        case 'READY':
            return 'Ready';
        case 'SERVED':
            return 'Served';
        break;
        case 'PAID':
            return 'Paid';
        break;
        case 'LATE':
            return 'Late';
        
        default: return "";
    }
    
  }
}