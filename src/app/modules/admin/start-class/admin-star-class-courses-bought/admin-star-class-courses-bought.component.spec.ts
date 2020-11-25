import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStarClassCoursesBoughtComponent } from './admin-star-class-courses-bought.component';

describe('AdminStarClassCoursesBoughtComponent', () => {
  let component: AdminStarClassCoursesBoughtComponent;
  let fixture: ComponentFixture<AdminStarClassCoursesBoughtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStarClassCoursesBoughtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStarClassCoursesBoughtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
