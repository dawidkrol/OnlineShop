import { TestBed } from '@angular/core/testing';

import { ContactinfoManagementService } from './contactinfo.management.service';

describe('ContactinfoManagementService', () => {
  let service: ContactinfoManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactinfoManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
