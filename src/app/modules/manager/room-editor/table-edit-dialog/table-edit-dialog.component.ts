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

  tableForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<TableEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Table,
    private formBuilder:FormBuilder) {
    this.table = data;
  }

  ngOnInit(): void {
    this.tableForm = this.formBuilder.group({
      number: [this.table.number || 0, [Validators.required, Validators.min(1)]],
      seats: [this.table.seats || 0, [Validators.required, Validators.min(1)]]
    })
  }
  
  save(): void {
    this.table.number = this.tableForm.get('number').value;
    this.table.seats = this.tableForm.get('seats').value;
    this.dialogRef.close(this.table);
  }

}
