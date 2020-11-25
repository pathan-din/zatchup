import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiStarclassCourseAddComponent } from './ei-starclass-course-add.component';

describe('EiStarclassCourseAddComponent', () => {
  let component: EiStarclassCourseAddComponent;
  let fixture: ComponentFixture<EiStarclassCourseAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiStarclassCourseAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiStarclassCourseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
