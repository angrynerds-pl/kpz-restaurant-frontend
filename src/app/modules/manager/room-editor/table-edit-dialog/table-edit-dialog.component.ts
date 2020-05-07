import { Component, OnInit, Inject } from '@angular/core';
import { Table } from 'src/app/models/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-table-edit-dialog',
  templateUrl: './table-edit-dialog.component.html',
  styleUrls: ['./table-edit-dialog.component.scss']
})
export class TableEditDialogComponent implements OnInit {

  table: Table;
  tables: Array<Table>;
  tableForm: FormGroup;
  oldNumber: number;

  wrongNumber: boolean = false;

  constructor(public dialogRef: MatDialogRef<TableEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder:FormBuilder) {
    this.table = data.table;
    this.tables = data.tables;
  }

  ngOnInit(): void {
    this.tableForm = this.formBuilder.group({
      number: [this.table.number || 0, [Validators.required, Validators.min(1)]],
      seats: [this.table.seats || 0, [Validators.required, Validators.min(1)]]
    })
    this.oldNumber = this.table.number;
  }
  
  save(): void {
    const number = this.tableForm.get('number').value;
    if(!this.isNumberTaken(number)){
      this.table.number = this.tableForm.get('number').value;
      this.table.seats = this.tableForm.get('seats').value;
      this.dialogRef.close({
        tables: this.tables,
        table: this.table
      });
    }
    else{
      this.wrongNumber = true;
    }
  }

  isNumberTaken(number: number){
    if(number === this.oldNumber) return false;
    const index = this.tables.findIndex(t => t.number == number);
    return index == -1 ? false : true;
  }

}
