import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOrderProductsComponent } from './history-order-products.component';

describe('HistoryOrderProductsComponent', () => {
  let component: HistoryOrderProductsComponent;
  let fixture: ComponentFixture<HistoryOrderProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryOrderProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryOrderProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
