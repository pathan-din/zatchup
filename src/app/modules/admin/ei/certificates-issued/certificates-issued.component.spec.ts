import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatesIssuedComponent } from './certificates-issued.component';

describe('CertificatesIssuedComponent', () => {
  let component: CertificatesIssuedComponent;
  let fixture: ComponentFixture<CertificatesIssuedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificatesIssuedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificatesIssuedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
