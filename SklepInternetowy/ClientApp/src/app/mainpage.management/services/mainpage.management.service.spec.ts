import { TestBed } from '@angular/core/testing';

import { MainpageManagementService } from './mainpage.management.service';

describe('MainpageManagementService', () => {
  let service: MainpageManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainpageManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
