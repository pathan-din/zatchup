import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKycPendingRequestComponent } from './admin-kyc-pending-request.component';

describe('AdminKycPendingRequestComponent', () => {
  let component: AdminKycPendingRequestComponent;
  let fixture: ComponentFixture<AdminKycPendingRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminKycPendingRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKycPendingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
