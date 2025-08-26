import { TestBed } from '@angular/core/testing';

import { TransformacionCampoS } from './transformacion-campo';

describe('TransformacionCampo', () => {
  let service: TransformacionCampoS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransformacionCampoS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
