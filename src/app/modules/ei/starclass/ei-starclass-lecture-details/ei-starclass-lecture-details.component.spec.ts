import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiStarclassLectureDetailsComponent } from './ei-starclass-lecture-details.component';

describe('EiStarclassLectureDetailsComponent', () => {
  let component: EiStarclassLectureDetailsComponent;
  let fixture: ComponentFixture<EiStarclassLectureDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiStarclassLectureDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiStarclassLectureDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
