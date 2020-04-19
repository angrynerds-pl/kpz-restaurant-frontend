import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemProductComponent } from './order-item-product.component';

describe('OrderItemProductComponent', () => {
  let component: OrderItemProductComponent;
  let fixture: ComponentFixture<OrderItemProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderItemProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
