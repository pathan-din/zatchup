import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStarClassCourseAddComponent } from './admin-star-class-course-add.component';

describe('AdminStarClassCourseAddComponent', () => {
  let component: AdminStarClassCourseAddComponent;
  let fixture: ComponentFixture<AdminStarClassCourseAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStarClassCourseAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStarClassCourseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
