import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiStudentListComponent } from './ei-student-list.component';

describe('EiStudentListComponent', () => {
  let component: EiStudentListComponent;
  let fixture: ComponentFixture<EiStudentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiStudentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiStudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
