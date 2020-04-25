import { Component, OnInit, Input } from '@angular/core';
import { Table } from 'src/app/models/table';

@Component({
  selector: 'app-table-info',
  templateUrl: './table-info.component.html',
  styleUrls: ['./table-info.component.scss']
})
export class TableInfoComponent implements OnInit {

  @Input() table:Table;

  constructor() { }

  ngOnInit(): void {
  }

}
