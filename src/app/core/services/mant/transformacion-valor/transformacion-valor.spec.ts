import { TestBed } from '@angular/core/testing';

import { TransformacionValor } from './transformacion-valor';

describe('TransformacionValor', () => {
  let service: TransformacionValor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransformacionValor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
