import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'status'})
export class ProductStatusPipe implements PipeTransform {
  transform(val: string): any {
    
    switch(val){
        case 'IN_PROGRESS':
            return 'In progress';
        case 'READY':
            return 'Ready';
        case 'SERVED':
            return 'Served';
        case 'PAID':
            return 'Paid';
        case 'LATE':
            return 'Late';
        
        default: return "";
    }
    
  }
}