import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEiManagementCoursePreviewComponent } from './admin-ei-management-course-preview.component';

describe('AdminEiManagementCoursePreviewComponent', () => {
  let component: AdminEiManagementCoursePreviewComponent;
  let fixture: ComponentFixture<AdminEiManagementCoursePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEiManagementCoursePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEiManagementCoursePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
