import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKycApprovalManagementComponent } from './admin-kyc-approval-management.component';

describe('AdminKycApprovalManagementComponent', () => {
  let component: AdminKycApprovalManagementComponent;
  let fixture: ComponentFixture<AdminKycApprovalManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminKycApprovalManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKycApprovalManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
