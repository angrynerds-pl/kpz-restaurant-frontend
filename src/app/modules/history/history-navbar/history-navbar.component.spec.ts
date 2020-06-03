import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryNavbarComponent } from './history-navbar.component';

describe('HistoryNavbarComponent', () => {
  let component: HistoryNavbarComponent;
  let fixture: ComponentFixture<HistoryNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
