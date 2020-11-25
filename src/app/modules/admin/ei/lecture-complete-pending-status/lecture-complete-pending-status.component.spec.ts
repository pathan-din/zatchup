import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureCompletePendingStatusComponent } from './lecture-complete-pending-status.component';

describe('LectureCompletePendingStatusComponent', () => {
  let component: LectureCompletePendingStatusComponent;
  let fixture: ComponentFixture<LectureCompletePendingStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LectureCompletePendingStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureCompletePendingStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
