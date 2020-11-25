import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserCertificatesComponent } from './admin-user-certificates.component';

describe('AdminUserCertificatesComponent', () => {
  let component: AdminUserCertificatesComponent;
  let fixture: ComponentFixture<AdminUserCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserCertificatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
