import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEiManagementCourseUploadPlayHistoryComponent } from './admin-ei-management-course-upload-play-history.component';

describe('AdminEiManagementCourseUploadPlayHistoryComponent', () => {
  let component: AdminEiManagementCourseUploadPlayHistoryComponent;
  let fixture: ComponentFixture<AdminEiManagementCourseUploadPlayHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEiManagementCourseUploadPlayHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEiManagementCourseUploadPlayHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
