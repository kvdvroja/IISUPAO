import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsDetail } from './tickets-detail';

describe('TicketsDetail', () => {
  let component: TicketsDetail;
  let fixture: ComponentFixture<TicketsDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketsDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
