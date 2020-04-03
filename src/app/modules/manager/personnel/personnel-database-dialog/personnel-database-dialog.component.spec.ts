import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelDatabaseDialogComponent } from './personnel-database-dialog.component';

describe('PersonnelDatabaseDialogComponent', () => {
  let component: PersonnelDatabaseDialogComponent;
  let fixture: ComponentFixture<PersonnelDatabaseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnelDatabaseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelDatabaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
