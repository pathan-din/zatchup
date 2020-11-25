import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiSchoolRegisterComponent } from './ei-school-register.component';

describe('EiSchoolRegisterComponent', () => {
  let component: EiSchoolRegisterComponent;
  let fixture: ComponentFixture<EiSchoolRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiSchoolRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiSchoolRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
