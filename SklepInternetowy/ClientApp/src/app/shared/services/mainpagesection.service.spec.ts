import { TestBed } from '@angular/core/testing';

import { MainpagesectionService } from './mainpagesection.service';

describe('MainpagesectionService', () => {
  let service: MainpagesectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainpagesectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
