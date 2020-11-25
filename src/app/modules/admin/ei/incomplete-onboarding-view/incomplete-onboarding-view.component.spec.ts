import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncompleteOnboardingViewComponent } from './incomplete-onboarding-view.component';

describe('IncompleteOnboardingViewComponent', () => {
  let component: IncompleteOnboardingViewComponent;
  let fixture: ComponentFixture<IncompleteOnboardingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncompleteOnboardingViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncompleteOnboardingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
