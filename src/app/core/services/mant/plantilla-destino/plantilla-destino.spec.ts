import { TestBed } from '@angular/core/testing';

import { PlantillaDestino } from './plantilla-destino';

describe('PlantillaDestino', () => {
  let service: PlantillaDestino;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantillaDestino);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
