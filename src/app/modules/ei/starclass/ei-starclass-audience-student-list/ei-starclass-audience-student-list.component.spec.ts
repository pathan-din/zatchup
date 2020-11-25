import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiStarclassAudienceStudentListComponent } from './ei-starclass-audience-student-list.component';

describe('EiStarclassAudienceStudentListComponent', () => {
  let component: EiStarclassAudienceStudentListComponent;
  let fixture: ComponentFixture<EiStarclassAudienceStudentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiStarclassAudienceStudentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiStarclassAudienceStudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
