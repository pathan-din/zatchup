import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestForCourseListViewComponent } from './request-for-course-list-view.component';

describe('RequestForCourseListViewComponent', () => {
  let component: RequestForCourseListViewComponent;
  let fixture: ComponentFixture<RequestForCourseListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestForCourseListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestForCourseListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
