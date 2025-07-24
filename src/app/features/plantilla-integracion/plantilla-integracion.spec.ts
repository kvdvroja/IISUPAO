import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaIntegracion } from './plantilla-integracion';

describe('PlantillaIntegracion', () => {
  let component: PlantillaIntegracion;
  let fixture: ComponentFixture<PlantillaIntegracion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantillaIntegracion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantillaIntegracion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
