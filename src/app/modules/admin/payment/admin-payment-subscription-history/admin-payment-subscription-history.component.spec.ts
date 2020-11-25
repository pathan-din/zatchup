import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaymentSubscriptionHistoryComponent } from './admin-payment-subscription-history.component';

describe('AdminPaymentSubscriptionHistoryComponent', () => {
  let component: AdminPaymentSubscriptionHistoryComponent;
  let fixture: ComponentFixture<AdminPaymentSubscriptionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPaymentSubscriptionHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPaymentSubscriptionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
