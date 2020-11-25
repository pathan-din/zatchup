import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiSchoolProfileComponent } from './ei-school-profile.component';

describe('EiSchoolProfileComponent', () => {
  let component: EiSchoolProfileComponent;
  let fixture: ComponentFixture<EiSchoolProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiSchoolProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiSchoolProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
