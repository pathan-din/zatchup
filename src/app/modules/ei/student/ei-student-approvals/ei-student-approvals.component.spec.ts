import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiStudentApprovalsComponent } from './ei-student-approvals.component';

describe('EiStudentApprovalsComponent', () => {
  let component: EiStudentApprovalsComponent;
  let fixture: ComponentFixture<EiStudentApprovalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiStudentApprovalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiStudentApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
