import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaymentSubscriptionComponent } from './admin-payment-subscription.component';

describe('AdminPaymentSubscriptionComponent', () => {
  let component: AdminPaymentSubscriptionComponent;
  let fixture: ComponentFixture<AdminPaymentSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPaymentSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPaymentSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
