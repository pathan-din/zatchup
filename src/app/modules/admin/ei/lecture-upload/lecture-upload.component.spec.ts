import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureUploadComponent } from './lecture-upload.component';

describe('LectureUploadComponent', () => {
  let component: LectureUploadComponent;
  let fixture: ComponentFixture<LectureUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LectureUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
