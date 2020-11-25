import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingRequestHistoryComponent } from './onboarding-request-history.component';

describe('OnboardingRequestHistoryComponent', () => {
  let component: OnboardingRequestHistoryComponent;
  let fixture: ComponentFixture<OnboardingRequestHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingRequestHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingRequestHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
