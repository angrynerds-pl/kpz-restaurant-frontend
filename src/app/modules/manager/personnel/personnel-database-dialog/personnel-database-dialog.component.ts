import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-personnel-database-dialog',
  templateUrl: './personnel-database-dialog.component.html',
  styleUrls: ['./personnel-database-dialog.component.scss']
})
export class PersonnelDatabaseDialogComponent implements OnInit{

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public dialogRef: MatDialogRef<PersonnelDatabaseDialogComponent>
  ) {}

  ngOnInit(): void {
  
  }
  
  close(){
    this.dialogRef.close();
  }

}
