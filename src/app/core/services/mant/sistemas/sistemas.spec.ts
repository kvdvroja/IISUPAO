import { TestBed } from '@angular/core/testing';

import { Sistemas } from './sistemas';

describe('Sistemas', () => {
  let service: Sistemas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sistemas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
