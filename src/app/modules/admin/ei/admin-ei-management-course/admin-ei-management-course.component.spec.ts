import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEiManagementCourseComponent } from './admin-ei-management-course.component';

describe('AdminEiManagementCourseComponent', () => {
  let component: AdminEiManagementCourseComponent;
  let fixture: ComponentFixture<AdminEiManagementCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEiManagementCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEiManagementCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
