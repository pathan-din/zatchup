import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaymentOnboardingFeeHistoryComponent } from './admin-payment-onboarding-fee-history.component';

describe('AdminPaymentOnboardingFeeHistoryComponent', () => {
  let component: AdminPaymentOnboardingFeeHistoryComponent;
  let fixture: ComponentFixture<AdminPaymentOnboardingFeeHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPaymentOnboardingFeeHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPaymentOnboardingFeeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
