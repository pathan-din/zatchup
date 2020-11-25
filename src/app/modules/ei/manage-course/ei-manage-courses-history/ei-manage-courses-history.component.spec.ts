import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiManageCoursesHistoryComponent } from './ei-manage-courses-history.component';

describe('EiManageCoursesHistoryComponent', () => {
  let component: EiManageCoursesHistoryComponent;
  let fixture: ComponentFixture<EiManageCoursesHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiManageCoursesHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiManageCoursesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
