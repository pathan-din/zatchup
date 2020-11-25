import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiStarclassCourseHistoryComponent } from './ei-starclass-course-history.component';

describe('EiStarclassCourseHistoryComponent', () => {
  let component: EiStarclassCourseHistoryComponent;
  let fixture: ComponentFixture<EiStarclassCourseHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiStarclassCourseHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiStarclassCourseHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
