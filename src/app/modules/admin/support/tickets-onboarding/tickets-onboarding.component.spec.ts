import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsOnboardingComponent } from './tickets-onboarding.component';

describe('TicketsOnboardingComponent', () => {
  let component: TicketsOnboardingComponent;
  let fixture: ComponentFixture<TicketsOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsOnboardingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
