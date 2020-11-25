import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaymentCouponStatusComponent } from './admin-payment-coupon-status.component';

describe('AdminPaymentCouponStatusComponent', () => {
  let component: AdminPaymentCouponStatusComponent;
  let fixture: ComponentFixture<AdminPaymentCouponStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPaymentCouponStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPaymentCouponStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
