import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiManageCoursesAddComponent } from './ei-manage-courses-add.component';

describe('EiManageCoursesAddComponent', () => {
  let component: EiManageCoursesAddComponent;
  let fixture: ComponentFixture<EiManageCoursesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiManageCoursesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiManageCoursesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
