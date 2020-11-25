import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserEducationProfileComponent } from './admin-user-education-profile.component';

describe('AdminUserEducationProfileComponent', () => {
  let component: AdminUserEducationProfileComponent;
  let fixture: ComponentFixture<AdminUserEducationProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserEducationProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserEducationProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
