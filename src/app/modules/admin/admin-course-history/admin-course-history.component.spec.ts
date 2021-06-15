import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourseHistoryComponent } from './admin-course-history.component';

describe('AdminCourseHistoryComponent', () => {
  let component: AdminCourseHistoryComponent;
  let fixture: ComponentFixture<AdminCourseHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCourseHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCourseHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
