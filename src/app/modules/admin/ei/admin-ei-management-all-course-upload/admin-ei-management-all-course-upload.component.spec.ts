import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEiManagementAllCourseUploadComponent } from './admin-ei-management-all-course-upload.component';

describe('AdminEiManagementAllCourseUploadComponent', () => {
  let component: AdminEiManagementAllCourseUploadComponent;
  let fixture: ComponentFixture<AdminEiManagementAllCourseUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEiManagementAllCourseUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEiManagementAllCourseUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
