import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformacionValores } from './transformacion-valores';

describe('TransformacionValores', () => {
  let component: TransformacionValores;
  let fixture: ComponentFixture<TransformacionValores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransformacionValores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransformacionValores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
