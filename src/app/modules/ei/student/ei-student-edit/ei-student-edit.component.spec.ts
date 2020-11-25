import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiStudentEditComponent } from './ei-student-edit.component';

describe('EiStudentEditComponent', () => {
  let component: EiStudentEditComponent;
  let fixture: ComponentFixture<EiStudentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiStudentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiStudentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
