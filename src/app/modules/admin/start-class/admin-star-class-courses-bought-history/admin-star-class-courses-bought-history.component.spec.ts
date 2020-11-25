import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStarClassCoursesBoughtHistoryComponent } from './admin-star-class-courses-bought-history.component';

describe('AdminStarClassCoursesBoughtHistoryComponent', () => {
  let component: AdminStarClassCoursesBoughtHistoryComponent;
  let fixture: ComponentFixture<AdminStarClassCoursesBoughtHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStarClassCoursesBoughtHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStarClassCoursesBoughtHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
