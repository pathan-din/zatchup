import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaymentCommissionsComponent } from './admin-payment-commissions.component';

describe('AdminPaymentCommissionsComponent', () => {
  let component: AdminPaymentCommissionsComponent;
  let fixture: ComponentFixture<AdminPaymentCommissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPaymentCommissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPaymentCommissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
