import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiStudentVerifiedListComponent } from './ei-student-verified-list.component';

describe('EiStudentVerifiedListComponent', () => {
  let component: EiStudentVerifiedListComponent;
  let fixture: ComponentFixture<EiStudentVerifiedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiStudentVerifiedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiStudentVerifiedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
