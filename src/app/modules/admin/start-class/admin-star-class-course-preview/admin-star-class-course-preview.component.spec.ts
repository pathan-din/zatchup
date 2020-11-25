import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStarClassCoursePreviewComponent } from './admin-star-class-course-preview.component';

describe('AdminStarClassCoursePreviewComponent', () => {
  let component: AdminStarClassCoursePreviewComponent;
  let fixture: ComponentFixture<AdminStarClassCoursePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStarClassCoursePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStarClassCoursePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
