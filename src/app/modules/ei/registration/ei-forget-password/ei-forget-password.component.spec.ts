import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiForgetPasswordComponent } from './ei-forget-password.component';

describe('EiForgetPasswordComponent', () => {
  let component: EiForgetPasswordComponent;
  let fixture: ComponentFixture<EiForgetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiForgetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
