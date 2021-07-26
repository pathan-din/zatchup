import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolApprovalListSignupComponent } from './school-approval-list-signup.component';

describe('SchoolApprovalListSignupComponent', () => {
  let component: SchoolApprovalListSignupComponent;
  let fixture: ComponentFixture<SchoolApprovalListSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolApprovalListSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolApprovalListSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
