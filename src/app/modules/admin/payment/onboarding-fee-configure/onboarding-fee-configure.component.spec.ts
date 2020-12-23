import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingFeeConfigureComponent } from './onboarding-fee-configure.component';

describe('OnboardingFeeConfigureComponent', () => {
  let component: OnboardingFeeConfigureComponent;
  let fixture: ComponentFixture<OnboardingFeeConfigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingFeeConfigureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingFeeConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
