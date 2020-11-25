import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddCourseComponent } from './user-add-course.component';

describe('UserAddCourseComponent', () => {
  let component: UserAddCourseComponent;
  let fixture: ComponentFixture<UserAddCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
