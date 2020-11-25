import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStarClassCourseEditComponent } from './admin-star-class-course-edit.component';

describe('AdminStarClassCourseEditComponent', () => {
  let component: AdminStarClassCourseEditComponent;
  let fixture: ComponentFixture<AdminStarClassCourseEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStarClassCourseEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStarClassCourseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
