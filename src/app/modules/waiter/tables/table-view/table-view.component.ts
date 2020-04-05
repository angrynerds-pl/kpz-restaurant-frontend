import { Component, OnInit, Input } from '@angular/core';
import { Table } from 'src/app/models/table';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {

  @Input() table:Table;

  constructor() { }

  ngOnInit(): void {
  }

  getClass() {
    switch(this.table.status){
      case 'free':
        return 'table-view free';
      case 'serve':
        return 'table-view serve';
      case 'occupied':
        return 'table-view occupied';
    }
  }

}
