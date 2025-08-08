import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuInstructivo } from './menu-instructivo';

describe('MenuInstructivo', () => {
  let component: MenuInstructivo;
  let fixture: ComponentFixture<MenuInstructivo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuInstructivo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuInstructivo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
