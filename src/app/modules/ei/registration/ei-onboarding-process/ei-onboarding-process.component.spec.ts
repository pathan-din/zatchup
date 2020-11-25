import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiOnboardingProcessComponent } from './ei-onboarding-process.component';

describe('EiOnboardingProcessComponent', () => {
  let component: EiOnboardingProcessComponent;
  let fixture: ComponentFixture<EiOnboardingProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiOnboardingProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiOnboardingProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
