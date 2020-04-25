import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEditDialogComponent } from './table-edit-dialog.component';

describe('TableEditDialogComponent', () => {
  let component: TableEditDialogComponent;
  let fixture: ComponentFixture<TableEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
