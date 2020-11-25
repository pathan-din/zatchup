import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaymentAdvertisementComponent } from './admin-payment-advertisement.component';

describe('AdminPaymentAdvertisementComponent', () => {
  let component: AdminPaymentAdvertisementComponent;
  let fixture: ComponentFixture<AdminPaymentAdvertisementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPaymentAdvertisementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPaymentAdvertisementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
