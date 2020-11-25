import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiStarclassCoursesUploadedByEiComponent } from './ei-starclass-courses-uploaded-by-ei.component';

describe('EiStarclassCoursesUploadedByEiComponent', () => {
  let component: EiStarclassCoursesUploadedByEiComponent;
  let fixture: ComponentFixture<EiStarclassCoursesUploadedByEiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiStarclassCoursesUploadedByEiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiStarclassCoursesUploadedByEiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
