import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarclassLectureHistoryComponent } from './starclass-lecture-history.component';

describe('StarclassLectureHistoryComponent', () => {
  let component: StarclassLectureHistoryComponent;
  let fixture: ComponentFixture<StarclassLectureHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarclassLectureHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarclassLectureHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
