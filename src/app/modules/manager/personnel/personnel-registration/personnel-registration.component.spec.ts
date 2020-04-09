import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelRegistrationComponent } from './personnel-registration.component';

describe('PersonnelRegistrationComponent', () => {
  let component: PersonnelRegistrationComponent;
  let fixture: ComponentFixture<PersonnelRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnelRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
