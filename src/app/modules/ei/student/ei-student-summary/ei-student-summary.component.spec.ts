import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiStudentSummaryComponent } from './ei-student-summary.component';

describe('EiStudentSummaryComponent', () => {
  let component: EiStudentSummaryComponent;
  let fixture: ComponentFixture<EiStudentSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiStudentSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiStudentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
