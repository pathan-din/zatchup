import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketForOnboardingComponent } from './ticket-for-onboarding.component';

describe('TicketForOnboardingComponent', () => {
  let component: TicketForOnboardingComponent;
  let fixture: ComponentFixture<TicketForOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketForOnboardingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketForOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
