import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLectureDetailsComponent } from './project-lecture-details.component';

describe('ProjectLectureDetailsComponent', () => {
  let component: ProjectLectureDetailsComponent;
  let fixture: ComponentFixture<ProjectLectureDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectLectureDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectLectureDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
