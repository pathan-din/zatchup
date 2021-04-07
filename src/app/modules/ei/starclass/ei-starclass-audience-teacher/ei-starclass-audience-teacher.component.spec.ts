import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EiStarclassAudienceTeacherComponent } from './ei-starclass-audience-teacher.component';

describe('EiStarclassAudienceTeacherComponent', () => {
  let component: EiStarclassAudienceTeacherComponent;
  let fixture: ComponentFixture<EiStarclassAudienceTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EiStarclassAudienceTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EiStarclassAudienceTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
