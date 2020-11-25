import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiStudentManagementComponent } from './ei-student-management.component';

describe('EiStudentManagementComponent', () => {
  let component: EiStudentManagementComponent;
  let fixture: ComponentFixture<EiStudentManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiStudentManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiStudentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
