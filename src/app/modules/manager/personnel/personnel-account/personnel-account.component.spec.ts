import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelAccountComponent } from './personnel-account.component';

describe('PersonnelAccountComponent', () => {
  let component: PersonnelAccountComponent;
  let fixture: ComponentFixture<PersonnelAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnelAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
