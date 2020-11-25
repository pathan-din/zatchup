import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiStarclassCoursesPreviewComponent } from './ei-starclass-courses-preview.component';

describe('EiStarclassCoursesPreviewComponent', () => {
  let component: EiStarclassCoursesPreviewComponent;
  let fixture: ComponentFixture<EiStarclassCoursesPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiStarclassCoursesPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiStarclassCoursesPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
