import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEiManagementIncompleteOnboardingComponent } from './admin-ei-management-incomplete-onboarding.component';

describe('AdminEiManagementIncompleteOnboardingComponent', () => {
  let component: AdminEiManagementIncompleteOnboardingComponent;
  let fixture: ComponentFixture<AdminEiManagementIncompleteOnboardingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEiManagementIncompleteOnboardingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEiManagementIncompleteOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
