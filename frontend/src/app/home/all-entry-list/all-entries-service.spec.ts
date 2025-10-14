import { TestBed } from '@angular/core/testing';

import { AllEntries } from './all-entries-service';

describe('AllEntries', () => {
  let service: AllEntries;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllEntries);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
