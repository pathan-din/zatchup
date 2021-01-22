import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPendingForCourseComponent } from './request-pending-for-course.component';

describe('RequestPendingForCourseComponent', () => {
  let component: RequestPendingForCourseComponent;
  let fixture: ComponentFixture<RequestPendingForCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestPendingForCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPendingForCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
