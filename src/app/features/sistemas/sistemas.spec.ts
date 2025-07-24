import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sistemas } from './sistemas';

describe('Sistemas', () => {
  let component: Sistemas;
  let fixture: ComponentFixture<Sistemas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sistemas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sistemas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
