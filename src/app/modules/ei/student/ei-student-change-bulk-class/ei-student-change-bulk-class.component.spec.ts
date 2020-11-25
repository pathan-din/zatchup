import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiStudentChangeBulkClassComponent } from './ei-student-change-bulk-class.component';

describe('EiStudentChangeBulkClassComponent', () => {
  let component: EiStudentChangeBulkClassComponent;
  let fixture: ComponentFixture<EiStudentChangeBulkClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiStudentChangeBulkClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiStudentChangeBulkClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
