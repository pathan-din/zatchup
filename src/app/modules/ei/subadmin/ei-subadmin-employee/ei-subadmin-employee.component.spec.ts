import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiSubadminEmployeeComponent } from './ei-subadmin-employee.component';

describe('EiSubadminEmployeeComponent', () => {
  let component: EiSubadminEmployeeComponent;
  let fixture: ComponentFixture<EiSubadminEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiSubadminEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiSubadminEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
