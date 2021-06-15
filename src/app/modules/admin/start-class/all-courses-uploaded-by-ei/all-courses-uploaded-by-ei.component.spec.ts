import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCoursesUploadedByEiComponent } from './all-courses-uploaded-by-ei.component';

describe('AllCoursesUploadedByEiComponent', () => {
  let component: AllCoursesUploadedByEiComponent;
  let fixture: ComponentFixture<AllCoursesUploadedByEiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCoursesUploadedByEiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCoursesUploadedByEiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
