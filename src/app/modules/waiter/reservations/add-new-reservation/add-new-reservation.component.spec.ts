import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewReservationComponent } from './add-new-reservation.component';

describe('AddNewReservationComponent', () => {
  let component: AddNewReservationComponent;
  let fixture: ComponentFixture<AddNewReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
