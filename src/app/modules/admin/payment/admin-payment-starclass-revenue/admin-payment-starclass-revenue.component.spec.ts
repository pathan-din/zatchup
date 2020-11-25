import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaymentStarclassRevenueComponent } from './admin-payment-starclass-revenue.component';

describe('AdminPaymentStarclassRevenueComponent', () => {
  let component: AdminPaymentStarclassRevenueComponent;
  let fixture: ComponentFixture<AdminPaymentStarclassRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPaymentStarclassRevenueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPaymentStarclassRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
