import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiManageCoursesComponent } from './ei-manage-courses.component';

describe('EiManageCoursesComponent', () => {
  let component: EiManageCoursesComponent;
  let fixture: ComponentFixture<EiManageCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiManageCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiManageCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
