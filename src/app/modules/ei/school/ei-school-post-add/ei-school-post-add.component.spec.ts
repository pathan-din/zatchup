import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiSchoolPostAddComponent } from './ei-school-post-add.component';

describe('EiSchoolPostAddComponent', () => {
  let component: EiSchoolPostAddComponent;
  let fixture: ComponentFixture<EiSchoolPostAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiSchoolPostAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiSchoolPostAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
