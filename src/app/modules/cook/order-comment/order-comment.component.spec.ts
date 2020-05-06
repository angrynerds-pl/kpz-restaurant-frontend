import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCommentComponent } from './order-comment.component';

describe('OrderCommentComponent', () => {
  let component: OrderCommentComponent;
  let fixture: ComponentFixture<OrderCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
