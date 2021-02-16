import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingCourseDetailComponent } from './pending-course-detail.component';

describe('PendingCourseDetailComponent', () => {
  let component: PendingCourseDetailComponent;
  let fixture: ComponentFixture<PendingCourseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingCourseDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingCourseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
