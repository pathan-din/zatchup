import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiStarclassLectureEditComponent } from './ei-starclass-lecture-edit.component';

describe('EiStarclassLectureEditComponent', () => {
  let component: EiStarclassLectureEditComponent;
  let fixture: ComponentFixture<EiStarclassLectureEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiStarclassLectureEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiStarclassLectureEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
