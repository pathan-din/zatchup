import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiManageCoursesDetailsComponent } from './ei-manage-courses-details.component';

describe('EiManageCoursesDetailsComponent', () => {
  let component: EiManageCoursesDetailsComponent;
  let fixture: ComponentFixture<EiManageCoursesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiManageCoursesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiManageCoursesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
