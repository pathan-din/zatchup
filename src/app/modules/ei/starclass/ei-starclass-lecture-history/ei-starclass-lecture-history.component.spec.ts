import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiStarclassLectureHistoryComponent } from './ei-starclass-lecture-history.component';

describe('EiStarclassLectureHistoryComponent', () => {
  let component: EiStarclassLectureHistoryComponent;
  let fixture: ComponentFixture<EiStarclassLectureHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiStarclassLectureHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiStarclassLectureHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
