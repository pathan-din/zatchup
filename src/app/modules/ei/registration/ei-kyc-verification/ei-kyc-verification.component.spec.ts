import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiKycVerificationComponent } from './ei-kyc-verification.component';

describe('EiKycVerificationComponent', () => {
  let component: EiKycVerificationComponent;
  let fixture: ComponentFixture<EiKycVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiKycVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiKycVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
