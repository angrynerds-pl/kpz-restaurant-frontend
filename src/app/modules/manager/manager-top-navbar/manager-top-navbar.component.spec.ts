import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerTopNavbarComponent } from './manager-top-navbar.component';

describe('ManagerTopNavbarComponent', () => {
  let component: ManagerTopNavbarComponent;
  let fixture: ComponentFixture<ManagerTopNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerTopNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerTopNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
