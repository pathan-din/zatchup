import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoreCourseManuallyComponent } from './add-more-course-manually.component';

describe('AddMoreCourseManuallyComponent', () => {
  let component: AddMoreCourseManuallyComponent;
  let fixture: ComponentFixture<AddMoreCourseManuallyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMoreCourseManuallyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMoreCourseManuallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
