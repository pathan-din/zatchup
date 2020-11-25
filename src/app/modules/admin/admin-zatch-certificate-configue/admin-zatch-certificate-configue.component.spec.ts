import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminZatchCertificateConfigueComponent } from './admin-zatch-certificate-configue.component';

describe('AdminZatchCertificateConfigueComponent', () => {
  let component: AdminZatchCertificateConfigueComponent;
  let fixture: ComponentFixture<AdminZatchCertificateConfigueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminZatchCertificateConfigueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminZatchCertificateConfigueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
