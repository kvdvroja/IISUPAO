import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPlantillaDestino } from './formulario-plantilla-destino';

describe('FormularioPlantillaDestino', () => {
  let component: FormularioPlantillaDestino;
  let fixture: ComponentFixture<FormularioPlantillaDestino>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioPlantillaDestino]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioPlantillaDestino);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
