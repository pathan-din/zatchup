import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiStarclassEditRightTeacherComponent } from './ei-starclass-edit-right-teacher.component';

describe('EiStarclassEditRightTeacherComponent', () => {
  let component: EiStarclassEditRightTeacherComponent;
  let fixture: ComponentFixture<EiStarclassEditRightTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiStarclassEditRightTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiStarclassEditRightTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
