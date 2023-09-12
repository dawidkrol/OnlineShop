import { TestBed } from '@angular/core/testing';

import { ShopitemssectionService } from './shopitemssection.service';

describe('ShopitemssectionService', () => {
  let service: ShopitemssectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopitemssectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
