import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelDatabaseComponent } from './personnel-database.component';

describe('PersonnelDatabaseComponent', () => {
  let component: PersonnelDatabaseComponent;
  let fixture: ComponentFixture<PersonnelDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnelDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
