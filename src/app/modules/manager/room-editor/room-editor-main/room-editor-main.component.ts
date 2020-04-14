import { Component, OnInit } from '@angular/core';
import { Table } from 'src/app/models/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-editor-main',
  templateUrl: './room-editor-main.component.html',
  styleUrls: ['./room-editor-main.component.scss']
})
export class RoomEditorMainComponent implements OnInit {

  rows:number;
  columns: number;

  rowsOption: Array<number>;
  columnsOption: Array<number>;

  grid: Array<Array<Table>>;

  tables: Array<Table> = [];

  picked: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.rowsOption = Array.from(Array(8).keys()).map(x => x + 3);
    this.columnsOption = Array.from(Array(3).keys()).map(x => x + 2);
  }

  create(){
    this.grid = new Array(this.rows).fill(null).map(() => new Array(this.columns).fill(null));
    this.picked = true;
  }

  add(table){
    this.tables.push(table);
  }

  delete(table){
    this.tables = this.tables.filter(e => e !== table);
  }

  getFormClass(){
    if(this.picked) return "hidden";
    return "col-12";
  }

}
