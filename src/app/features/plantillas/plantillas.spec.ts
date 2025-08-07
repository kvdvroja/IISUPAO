import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Plantillas } from './plantillas';

describe('PlantillaIntegracion', () => {
  let component: Plantillas;
  let fixture: ComponentFixture<Plantillas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Plantillas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Plantillas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
