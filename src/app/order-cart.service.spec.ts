import { TestBed } from '@angular/core/testing';

import { OrderCartService } from './order-cart.service';

describe('OrderCartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderCartService = TestBed.get(OrderCartService);
    expect(service).toBeTruthy();
  });
});
