import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSchoolManagementComponent } from './admin-school-management.component';

describe('AdminSchoolManagementComponent', () => {
  let component: AdminSchoolManagementComponent;
  let fixture: ComponentFixture<AdminSchoolManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSchoolManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSchoolManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
