import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EiStarclassCourseViewComponent } from './ei-starclass-course-view.component';

describe('EiStarclassCourseViewComponent', () => {
  let component: EiStarclassCourseViewComponent;
  let fixture: ComponentFixture<EiStarclassCourseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EiStarclassCourseViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EiStarclassCourseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
