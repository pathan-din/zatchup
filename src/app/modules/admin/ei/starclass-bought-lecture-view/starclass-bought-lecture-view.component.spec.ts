import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarclassBoughtLectureViewComponent } from './starclass-bought-lecture-view.component';

describe('StarclassBoughtLectureViewComponent', () => {
  let component: StarclassBoughtLectureViewComponent;
  let fixture: ComponentFixture<StarclassBoughtLectureViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarclassBoughtLectureViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarclassBoughtLectureViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
