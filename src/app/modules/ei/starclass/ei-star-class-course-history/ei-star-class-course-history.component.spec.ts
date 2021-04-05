import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EiStarClassCourseHistoryComponent } from './ei-star-class-course-history.component';

describe('EiStarClassCourseHistoryComponent', () => {
  let component: EiStarClassCourseHistoryComponent;
  let fixture: ComponentFixture<EiStarClassCourseHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EiStarClassCourseHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EiStarClassCourseHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
