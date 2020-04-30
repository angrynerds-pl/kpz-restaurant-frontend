import { TestBed } from '@angular/core/testing';

import { ProductsInOrderService } from './products-in-order.service';

describe('ProductsInOrderService', () => {
  let service: ProductsInOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsInOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
