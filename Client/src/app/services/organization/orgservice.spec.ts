import { TestBed } from '@angular/core/testing';

import { Orgservice } from './orgservice';

describe('Orgservice', () => {
  let service: Orgservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Orgservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
