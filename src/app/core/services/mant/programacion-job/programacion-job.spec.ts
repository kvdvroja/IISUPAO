import { TestBed } from '@angular/core/testing';

import { ProgramacionJob } from './programacion-job';

describe('ProgramacionJob', () => {
  let service: ProgramacionJob;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramacionJob);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
