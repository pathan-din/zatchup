import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStarclassCourseListComponent } from './user-starclass-course-list.component';

describe('UserStarclassCourseListComponent', () => {
  let component: UserStarclassCourseListComponent;
  let fixture: ComponentFixture<UserStarclassCourseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserStarclassCourseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStarclassCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
