import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaymentOnboardingComponent } from './admin-payment-onboarding.component';

describe('AdminPaymentOnboardingComponent', () => {
  let component: AdminPaymentOnboardingComponent;
  let fixture: ComponentFixture<AdminPaymentOnboardingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPaymentOnboardingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPaymentOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
