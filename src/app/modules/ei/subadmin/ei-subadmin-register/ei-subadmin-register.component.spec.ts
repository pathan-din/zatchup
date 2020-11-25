import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiSubadminRegisterComponent } from './ei-subadmin-register.component';

describe('EiSubadminRegisterComponent', () => {
  let component: EiSubadminRegisterComponent;
  let fixture: ComponentFixture<EiSubadminRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiSubadminRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiSubadminRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
