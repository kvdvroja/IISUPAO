import { TestBed } from '@angular/core/testing';

import { PlantillaIntegracion } from './plantilla-integracion';

describe('PlantillaIntegracion', () => {
  let service: PlantillaIntegracion;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantillaIntegracion);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
