import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiStudentHistoryComponent } from './ei-student-history.component';

describe('EiStudentHistoryComponent', () => {
  let component: EiStudentHistoryComponent;
  let fixture: ComponentFixture<EiStudentHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiStudentHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiStudentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
