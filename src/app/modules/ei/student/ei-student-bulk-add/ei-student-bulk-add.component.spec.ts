import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiStudentBulkAddComponent } from './ei-student-bulk-add.component';

describe('EiStudentBulkAddComponent', () => {
  let component: EiStudentBulkAddComponent;
  let fixture: ComponentFixture<EiStudentBulkAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiStudentBulkAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiStudentBulkAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
