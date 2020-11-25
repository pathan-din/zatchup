import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiOtpVerificationComponent } from './ei-otp-verification.component';

describe('EiOtpVerificationComponent', () => {
  let component: EiOtpVerificationComponent;
  let fixture: ComponentFixture<EiOtpVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiOtpVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiOtpVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
