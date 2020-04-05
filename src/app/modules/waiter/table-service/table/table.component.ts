import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'src/app/models/table';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  id: number;
  table:Table = {} as Table;

  constructor(private route:ActivatedRoute, private tableService:TableService) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.id = data.id;
    })
    this.tableService.getTable(this.id).subscribe(data => {
      this.table = data;
    })
  }

  getClass() {
    switch(this.table.status){
      case 'free':
        return 'free';
      case 'serve':
        return 'serve';
      case 'occupied':
        return 'occupied';
    }
  }

}
