import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStarClassCourseUploadedByEiComponent } from './admin-star-class-course-uploaded-by-ei.component';

describe('AdminStarClassCourseUploadedByEiComponent', () => {
  let component: AdminStarClassCourseUploadedByEiComponent;
  let fixture: ComponentFixture<AdminStarClassCourseUploadedByEiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStarClassCourseUploadedByEiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStarClassCourseUploadedByEiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
