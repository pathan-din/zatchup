import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarclassLectureDetailsViewComponent } from './starclass-lecture-details-view.component';

describe('StarclassLectureDetailsViewComponent', () => {
  let component: StarclassLectureDetailsViewComponent;
  let fixture: ComponentFixture<StarclassLectureDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarclassLectureDetailsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarclassLectureDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
