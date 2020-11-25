import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaymentSubscriptionConfigureComponent } from './admin-payment-subscription-configure.component';

describe('AdminPaymentSubscriptionConfigureComponent', () => {
  let component: AdminPaymentSubscriptionConfigureComponent;
  let fixture: ComponentFixture<AdminPaymentSubscriptionConfigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPaymentSubscriptionConfigureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPaymentSubscriptionConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
