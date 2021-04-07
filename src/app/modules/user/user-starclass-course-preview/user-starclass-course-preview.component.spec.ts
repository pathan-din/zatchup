import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStarclassCoursePreviewComponent } from './user-starclass-course-preview.component';

describe('UserStarclassCoursePreviewComponent', () => {
  let component: UserStarclassCoursePreviewComponent;
  let fixture: ComponentFixture<UserStarclassCoursePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserStarclassCoursePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStarclassCoursePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
