import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarclassCoursesDetailsViewComponent } from './starclass-courses-details-view.component';

describe('StarclassCoursesDetailsViewComponent', () => {
  let component: StarclassCoursesDetailsViewComponent;
  let fixture: ComponentFixture<StarclassCoursesDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarclassCoursesDetailsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarclassCoursesDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
