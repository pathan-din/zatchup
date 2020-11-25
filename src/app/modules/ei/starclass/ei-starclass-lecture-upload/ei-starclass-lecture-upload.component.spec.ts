import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiStarclassLectureUploadComponent } from './ei-starclass-lecture-upload.component';

describe('EiStarclassLectureUploadComponent', () => {
  let component: EiStarclassLectureUploadComponent;
  let fixture: ComponentFixture<EiStarclassLectureUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiStarclassLectureUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiStarclassLectureUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
