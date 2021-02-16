import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKycChangeRequestDetailsComponent } from './admin-kyc-change-request-details.component';

describe('AdminKycChangeRequestDetailsComponent', () => {
  let component: AdminKycChangeRequestDetailsComponent;
  let fixture: ComponentFixture<AdminKycChangeRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminKycChangeRequestDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKycChangeRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
