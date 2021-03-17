import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarclassCoursePreviewComponent } from './starclass-course-preview.component';

describe('StarclassCoursePreviewComponent', () => {
  let component: StarclassCoursePreviewComponent;
  let fixture: ComponentFixture<StarclassCoursePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarclassCoursePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarclassCoursePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
