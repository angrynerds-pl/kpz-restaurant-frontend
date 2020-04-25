import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAddOrderComponent } from './table-add-order.component';

describe('TableAddOrderComponent', () => {
  let component: TableAddOrderComponent;
  let fixture: ComponentFixture<TableAddOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableAddOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAddOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
