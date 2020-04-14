import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Table } from 'src/app/models/table';
import { faCog } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-table-option',
  templateUrl: './table-option.component.html',
  styleUrls: ['./table-option.component.scss']
})
export class TableOptionComponent implements OnInit {

  selected: boolean = false;
  table: Table = {} as Table;

  icon = faCog;

  @Input() coordX: number;
  @Input() coordY: number;

  @Output() addTable: EventEmitter<Table> = new EventEmitter();
  @Output() deleteTable: EventEmitter<Table> = new EventEmitter();
  @Output() editTable: EventEmitter<Table> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.table = { x: this.coordX, y: this.coordY, status: 'free', number: null, seats: 0, tableID: 0, roomID: 0 };
  }

  select(){
    if(this.selected){
      if(confirm('Table will be deleted! Continue?')){
        this.deleteTable.emit(this.table);
        this.selected = !this.selected;
      }
    }
    else{
      this.addTable.emit(this.table);
      this.selected = !this.selected;
    }
  }

  edit(event){
    event.stopPropagation();
  }

  getClass(){
    if(this.selected) return "table-view table-option selected";
    return "table-view table-option";
  }

}
