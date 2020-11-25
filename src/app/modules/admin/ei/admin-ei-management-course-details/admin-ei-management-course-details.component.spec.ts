import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEiManagementCourseDetailsComponent } from './admin-ei-management-course-details.component';

describe('AdminEiManagementCourseDetailsComponent', () => {
  let component: AdminEiManagementCourseDetailsComponent;
  let fixture: ComponentFixture<AdminEiManagementCourseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEiManagementCourseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEiManagementCourseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
