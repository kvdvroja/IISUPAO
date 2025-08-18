import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramacionJob } from './programacion-job';

describe('ProgramacionJob', () => {
  let component: ProgramacionJob;
  let fixture: ComponentFixture<ProgramacionJob>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramacionJob]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramacionJob);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
