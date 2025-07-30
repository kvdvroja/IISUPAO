import { TestBed } from '@angular/core/testing';

import { Cola } from './cola';

describe('Cola', () => {
  let service: Cola;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cola);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
