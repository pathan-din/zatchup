import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarclassAddedCourseListComponent } from './starclass-added-course-list.component';

describe('StarclassAddedCourseListComponent', () => {
  let component: StarclassAddedCourseListComponent;
  let fixture: ComponentFixture<StarclassAddedCourseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarclassAddedCourseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarclassAddedCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
