import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaymentCouponComponent } from './admin-payment-coupon.component';

describe('AdminPaymentCouponComponent', () => {
  let component: AdminPaymentCouponComponent;
  let fixture: ComponentFixture<AdminPaymentCouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPaymentCouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPaymentCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
