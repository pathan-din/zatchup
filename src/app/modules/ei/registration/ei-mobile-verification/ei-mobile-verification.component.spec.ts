import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiMobileVerificationComponent } from './ei-mobile-verification.component';

describe('EiMobileVerificationComponent', () => {
  let component: EiMobileVerificationComponent;
  let fixture: ComponentFixture<EiMobileVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiMobileVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiMobileVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
