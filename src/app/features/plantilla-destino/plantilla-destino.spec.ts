import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaDestino } from './plantilla-destino';

describe('PlantillaDestino', () => {
  let component: PlantillaDestino;
  let fixture: ComponentFixture<PlantillaDestino>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantillaDestino]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantillaDestino);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
