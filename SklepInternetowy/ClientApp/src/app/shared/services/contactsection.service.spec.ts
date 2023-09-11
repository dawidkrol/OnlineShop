import { TestBed } from '@angular/core/testing';

import { ContactSectionService } from './contactSection.service';

describe('ContactService', () => {
  let service: ContactSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
