import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZatchupStarclassCoursePreviewComponent } from './zatchup-starclass-course-preview.component';

describe('ZatchupStarclassCoursePreviewComponent', () => {
  let component: ZatchupStarclassCoursePreviewComponent;
  let fixture: ComponentFixture<ZatchupStarclassCoursePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZatchupStarclassCoursePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZatchupStarclassCoursePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
