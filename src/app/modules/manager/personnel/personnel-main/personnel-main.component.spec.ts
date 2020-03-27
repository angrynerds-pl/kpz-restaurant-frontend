import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelMainComponent } from './personnel-main.component';

describe('PersonnelMainComponent', () => {
  let component: PersonnelMainComponent;
  let fixture: ComponentFixture<PersonnelMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnelMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
