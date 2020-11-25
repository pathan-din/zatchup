import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEiManagementIncompleteOnboardingViewComponent } from './admin-ei-management-incomplete-onboarding-view.component';

describe('AdminEiManagementIncompleteOnboardingViewComponent', () => {
  let component: AdminEiManagementIncompleteOnboardingViewComponent;
  let fixture: ComponentFixture<AdminEiManagementIncompleteOnboardingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEiManagementIncompleteOnboardingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEiManagementIncompleteOnboardingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
