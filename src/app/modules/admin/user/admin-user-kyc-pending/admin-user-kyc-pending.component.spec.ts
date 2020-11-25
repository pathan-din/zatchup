import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserKycPendingComponent } from './admin-user-kyc-pending.component';

describe('AdminUserKycPendingComponent', () => {
  let component: AdminUserKycPendingComponent;
  let fixture: ComponentFixture<AdminUserKycPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserKycPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserKycPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
