import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEiManagementPendingForApprovalComponent } from './admin-ei-management-pending-for-approval.component';

describe('AdminEiManagementPendingForApprovalComponent', () => {
  let component: AdminEiManagementPendingForApprovalComponent;
  let fixture: ComponentFixture<AdminEiManagementPendingForApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEiManagementPendingForApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEiManagementPendingForApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
