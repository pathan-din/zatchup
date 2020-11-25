import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiSubadminEmployeeContactComponent } from './ei-subadmin-employee-contact.component';

describe('EiSubadminEmployeeContactComponent', () => {
  let component: EiSubadminEmployeeContactComponent;
  let fixture: ComponentFixture<EiSubadminEmployeeContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiSubadminEmployeeContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiSubadminEmployeeContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
