import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Table } from 'src/app/models/table';
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { MatDialog } from '@angular/material/dialog';
import { TableEditDialogComponent } from '../table-edit-dialog/table-edit-dialog.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-table-option',
  templateUrl: './table-option.component.html',
  styleUrls: ['./table-option.component.scss']
})
export class TableOptionComponent implements OnInit, OnDestroy {

  selected: boolean = false;

  icon = faCog;

  @Input() table: Table;
  @Input() coordX: number;
  @Input() coordY: number;

  @Output() addTable: EventEmitter<Table> = new EventEmitter();
  @Output() deleteTable: EventEmitter<Table> = new EventEmitter();

  dialogSubscription: Subscription;
  
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    if(!this.table){
      this.table = { x: this.coordX, y: this.coordY, status: 'free', number: null, seats: null, tableID: 0, roomID: 0 };
    }
    else{
      this.selected = true;
    }
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
    this.openDialog();
  }

  getClass(){
    if(this.selected) return "table-view table-option selected";
    return "table-view table-option";
  }

  openDialog(){
    const dialogRef = this.dialog.open(TableEditDialogComponent, {
      width: '300px',
      height: '270px',
      data: this.table
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if(result) this.table = result;
    });
  }
  
  ngOnDestroy(){
    if(this.dialogSubscription) this.dialogSubscription.unsubscribe();
  }

}
