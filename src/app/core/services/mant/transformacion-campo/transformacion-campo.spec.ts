import { TestBed } from '@angular/core/testing';

import { TransformacionCampo } from './transformacion-campo';

describe('TransformacionCampo', () => {
  let service: TransformacionCampo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransformacionCampo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
