import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EiStarclassMycoursesComponent } from './ei-starclass-mycourses.component';

describe('EiStarclassMycoursesComponent', () => {
  let component: EiStarclassMycoursesComponent;
  let fixture: ComponentFixture<EiStarclassMycoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EiStarclassMycoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EiStarclassMycoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
