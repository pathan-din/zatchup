import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiStudentPendingVerificationComponent } from './ei-student-pending-verification.component';

describe('EiStudentPendingVerificationComponent', () => {
  let component: EiStudentPendingVerificationComponent;
  let fixture: ComponentFixture<EiStudentPendingVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiStudentPendingVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiStudentPendingVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
