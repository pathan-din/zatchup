import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiStudentProfileComponent } from './ei-student-profile.component';

describe('EiStudentProfileComponent', () => {
  let component: EiStudentProfileComponent;
  let fixture: ComponentFixture<EiStudentProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiStudentProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiStudentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
