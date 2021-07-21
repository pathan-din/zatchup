import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalListForTeacherComponent } from './approval-list-for-teacher.component';

describe('ApprovalListForTeacherComponent', () => {
  let component: ApprovalListForTeacherComponent;
  let fixture: ComponentFixture<ApprovalListForTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalListForTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalListForTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
