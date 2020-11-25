import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminZatchCertificateResultComponent } from './admin-zatch-certificate-result.component';

describe('AdminZatchCertificateResultComponent', () => {
  let component: AdminZatchCertificateResultComponent;
  let fixture: ComponentFixture<AdminZatchCertificateResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminZatchCertificateResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminZatchCertificateResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
