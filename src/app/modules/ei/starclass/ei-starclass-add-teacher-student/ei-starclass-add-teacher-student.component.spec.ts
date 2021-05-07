import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EiStarclassAddTeacherStudentComponent } from './ei-starclass-add-teacher-student.component';

describe('EiStarclassAddTeacherStudentComponent', () => {
  let component: EiStarclassAddTeacherStudentComponent;
  let fixture: ComponentFixture<EiStarclassAddTeacherStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EiStarclassAddTeacherStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EiStarclassAddTeacherStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
