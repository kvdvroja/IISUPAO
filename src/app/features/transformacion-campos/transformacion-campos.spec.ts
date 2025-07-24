import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformacionCampos } from './transformacion-campos';

describe('TransformacionCampos', () => {
  let component: TransformacionCampos;
  let fixture: ComponentFixture<TransformacionCampos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransformacionCampos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransformacionCampos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
